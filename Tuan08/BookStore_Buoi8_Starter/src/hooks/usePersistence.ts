import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setCredentials } from "../store/authSlice";
import { hydrateCart } from "../store/cartSlice";
import { hydrateWishlist } from "../store/wishlistSlice";
import { clearAuth, loadAuth, saveAuth } from "../storage/authStorage"; // đã viết sẵn
import { loadJSON } from "../storage/storage"; // đã viết sẵn
import { useAutoPersist } from "./useAutoPersist";
import { CartItem } from "../types"; // dùng khi đọc loadJSON<CartItem[]>

export const CART_KEY = "@bookstore/cart";
export const WISHLIST_KEY = "@bookstore/wishlist";

// Mở app → nạp dữ liệu đã lưu; sau đó mọi thay đổi tự ghi lại. App.tsx chỉ hiện màn hình chính khi ready = true.
export function usePersistence() {
  const dispatch = useAppDispatch();
  const [ready, setReady] = useState(false);
  const user = useAppSelector((s) => s.auth.user);
  const token = useAppSelector((s) => s.auth.token);
  const cartItems = useAppSelector((s) => s.cart.items);
  const wishlistIds = useAppSelector((s) => s.wishlist.ids);

  useEffect(() => {
    (async () => {
      // Đọc đồng thời auth, cart và wishlist từ AsyncStorage
      const [auth, cart, wish] = await Promise.all([
        loadAuth(),
        loadJSON<CartItem[]>(CART_KEY),
        loadJSON<number[]>(WISHLIST_KEY),
      ]);

      // TODO BT8.3: Nạp phiên đăng nhập nếu có
      if (auth?.token && auth.user) {
        dispatch(setCredentials(auth));
      }

      // TODO BT8.7b: Nạp giỏ hàng & danh sách yêu thích
      if (cart) {
        dispatch(hydrateCart(cart));
      }
      if (wish) {
        dispatch(hydrateWishlist(wish));
      }

      setReady(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    if (!ready) return;
    // TODO BT8.3: Lưu phiên khi đăng nhập, xóa phiên khi đăng xuất (user/token null)
    if (user && token) {
      saveAuth({ user, token });
    } else {
      clearAuth();
    }
  }, [ready, user, token]);

  // TODO BT8.7b: Tự động đồng bộ giỏ hàng và yêu thích vào AsyncStorage khi có thay đổi
  useAutoPersist(CART_KEY, cartItems, ready);
  useAutoPersist(WISHLIST_KEY, wishlistIds, ready);

  return ready;
}