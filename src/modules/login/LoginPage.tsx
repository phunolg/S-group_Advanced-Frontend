import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        const newErrors: { email?: string; password?: string } = {};
        
        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Please enter a valid email address";
        }
        
        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setIsLoading(true);
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log("Login attempt:", { email, password });
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-sm">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-center">
                        Login to your account
                    </CardTitle>
                    <CardDescription className="text-center">
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (errors.email) {
                                        setErrors(prev => ({ ...prev, email: undefined }));
                                    }
                                }}
                                className={errors.email ? "border-destructive" : ""}
                            />
                            {errors.email && (
                                <p className="text-sm text-destructive">{errors.email}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <a
                                    href="#"
                                    className="text-sm text-primary hover:underline"
                                >
                                    Forgot your password?
                                </a>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (errors.password) {
                                        setErrors(prev => ({ ...prev, password: undefined }));
                                    }
                                }}
                                className={errors.password ? "border-destructive" : ""}
                            />
                            {errors.password && (
                                <p className="text-sm text-destructive">{errors.password}</p>
                            )}
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Logging in..." : "Login"}
                        </Button>
                    </form>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div>
                    <Button variant="outline" type="button" className="w-full">
                        Login with Google
                    </Button>
                    <div className="text-center text-sm">
                        Don't have an account?{" "}
                        <a href="#" className="text-primary hover:underline">
                            Sign up
                        </a>
                    </div>
                </CardContent>
            </Card>
        </div>
        
        {/* Text section below login */}
        <div className="w-full max-w-4xl mx-auto p-8">
            <h3>Tại sao phải dùng key khi sử dụng list rendering?</h3>
            <p>- Các key giúp React xác định những phần tử nào đã thay đổi, được thêm, hay bị xóa hoặc cập nhật khi render lại danh sách.</p>
            <p>- Key giúp tạo định danh cố định cho mỗi phần tử trong danh sách, nhờ đó React có thể gắn đúng element với dữ liệu tương ứng. Điều này giúp tránh các lỗi như render sai hoặc mất state cục bộ khi dữ liệu thay đổi.</p>
            <p>- Key chỉ thực sự có ý nghĩa khi làm việc với mảng dữ liệu (khi render danh sách các phần tử). Khi sử dụng, ta cần đặt key trực tiếp vào các element trong mảng, thay vì gắn vào các thẻ DOM con bên trong component.</p>
            <p>- Ngoài ra, key chỉ được React dùng để xử lý nội bộ, các component con không thể đọc được prop.key. Nếu ta cần truyền giá trị giống với key vào component, phải dùng một prop khác với tên riêng.</p>
        </div>
        </>
    );
}