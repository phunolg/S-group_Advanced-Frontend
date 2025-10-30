import { LoginForm } from "../../features/authentication";
import { useNavigate, useLocation } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation() as any;
  const from = location.state?.from?.pathname || "/dashboard";

  const handleLoginSuccess = () => {
    navigate(from, { replace: true });
  };

  const handleLoginError = (error: string) => {
    console.error("Login error:", error);
    // TODO: Add error handling/display logic here
  };

  return (
    <main
      className="min-h-screen bg-gray-50 p-4"
      aria-labelledby="login-heading"
    >
      <div className="flex items-center justify-center">
        <LoginForm onSuccess={handleLoginSuccess} onError={handleLoginError} />
      </div>

      {/* Extra learning content below the login form */}
      <div className="max-w-3xl mx-auto mt-10 space-y-6 text-gray-800">
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-3">
            Hệ thống phân giải tên miền (DNS) là gì?
          </h2>
          <p className="mb-3">
            Hệ thống phân giải tên miền (hay được viết tắt là DNS do tên tiếng Anh
            Domain Name System) là một hệ thống cho phép thiết lập tương ứng giữa địa
            chỉ IP và tên miền trên Internet.
          </p>
          <p className="mb-3">
            Về căn bản, DNS giúp chuyển đổi các tên miền mà con người dễ ghi nhớ (dạng
            ký tự, ví dụ
            {" "}
            <a
              href="http://www.example.com/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              www.example.com
            </a>
            ) sang địa chỉ IP vật lý (dạng số, ví dụ 123.11.5.19) tương ứng của tên
            miền đó. DNS giúp liên kết với các trang thiết bị mạng cho các mục đích
            định vị và địa chỉ hóa các thiết bị trên Internet.
          </p>
          <p className="mb-3">
            Phép so sánh thường dùng để giải thích DNS là một "Danh bạ điện thoại",
            có khả năng tìm kiếm và dịch tên miền thành địa chỉ IP. Ví dụ,
            {" "}
            <a
              href="http://www.example.com/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              www.example.com
            </a>
            {" "}
            dịch thành 208.77.188.166. Tên miền Internet dễ nhớ hơn các địa chỉ IP như
            208.77.188.166 (IPv4) hoặc 2001:db8:1f70::999:de8:7648:6e8 (IPv6).
          </p>
          <p className="mb-3">
            DNS phân phối trách nhiệm gán tên miền và lập bản đồ những tên tới địa
            chỉ IP bằng cách định rõ những máy chủ có thẩm quyền cho mỗi tên miền.
            Những máy chủ có thẩm quyền được phân công chịu trách nhiệm đối với tên
            miền riêng của họ, và lần lượt có thể chỉ định tên máy chủ khác cho các
            tên miền phụ, tạo ra một hệ thống phân tán, chịu lỗi tốt và không phụ
            thuộc vào một trung tâm duy nhất.
          </p>
          <p className="mb-3">
            Ngoài ra, DNS còn lưu trữ các thông tin khác như danh sách máy chủ email
            chấp nhận thư cho một tên miền (bản ghi MX). Nhờ cung cấp một không gian
            phân phối từ khóa rộng lớn, DNS là một thành phần thiết yếu cho hoạt động
            của Internet và có thể được ứng dụng cho nhiều định dạng/dịch vụ khác.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-3">React Router là gì?</h2>
          <p className="mb-3">
            React Router là một thư viện cung cấp khả năng định tuyến cho các ứng
            dụng React. Định tuyến có nghĩa là xử lý điều hướng giữa các chế độ xem
            khác nhau trong ứng dụng.
          </p>
          <p className="mb-2">Nó cho phép bạn:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Tạo nhiều trang trong ứng dụng một trang (SPA)</li>
            <li>Xử lý tham số URL và chuỗi truy vấn</li>
            <li>Quản lý lịch sử trình duyệt và điều hướng</li>
            <li>Tạo các tuyến đường và bố cục lồng nhau</li>
            <li>Triển khai các tuyến được bảo vệ để xác thực</li>
          </ul>
          <p className="mt-3">
            Nếu không có bộ định tuyến, ứng dụng React của bạn sẽ bị giới hạn trong
            một trang duy nhất mà không có cách nào để điều hướng giữa các chế độ xem
            khác nhau.
          </p>
        </section>
      </div>
    </main>
  );
}