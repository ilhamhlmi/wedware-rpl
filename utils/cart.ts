export type CartItem = {
    id: string;
    name: string;
    image?: string;
    qty: number;
};

export const getCart = (): CartItem[] => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("cart") || "[]");
};

export const addToCart = (product: Omit<CartItem, "qty">) => {
    if (typeof window === "undefined") return;

    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
};

export const removeFromCart = (id: string) => {
    const cart = getCart().filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
};
