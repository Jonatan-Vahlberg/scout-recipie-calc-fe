

type User = {
    id: string;
    username: string; 
}

type BaseUserCart = {
    items: CartItem[];
    user: User;
}

type UserCart = {
    items: CartItem[];
    id: string;
    user: string;
    updated_at: string;
}


type Token = {
    access: string;
    refresh: string;
}