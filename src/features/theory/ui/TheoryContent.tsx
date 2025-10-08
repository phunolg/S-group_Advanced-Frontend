import { Card } from "../../../shared/ui";

export function TheoryContent() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">Kiến thức React & Frontend</h1>
      
      {/* StrictMode */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">StrictMode trong React là gì?</h2>
        <p className="mb-4">
          StrictMode là một công cụ được React cung cấp nhằm giúp lập trình viên phát hiện các vấn đề tiềm ẩn trong ứng dụng ngay trong quá trình phát triển. Nó không ảnh hưởng đến chức năng hay hiệu suất của ứng dụng khi chạy thật (production), mà chỉ hoạt động trong môi trường phát triển (development).
        </p>
        
        <h3 className="text-xl font-medium mb-3">1. Mục đích của StrictMode</h3>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Phát hiện và cảnh báo các đoạn code không an toàn hoặc sắp bị loại bỏ trong React.</li>
          <li>Giúp kiểm tra xem các component có tuân thủ quy tắc sử dụng hooks và vòng đời (lifecycle) đúng cách hay không.</li>
          <li>Đảm bảo ứng dụng có thể hoạt động ổn định khi React nâng cấp trong tương lai.</li>
        </ul>
        
        <h3 className="text-xl font-medium mb-3">2. Những gì StrictMode kiểm tra</h3>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Phát hiện các phương thức vòng đời cũ không an toàn như componentWillMount, componentWillReceiveProps, componentWillUpdate.</li>
          <li>Cảnh báo khi có side effect không mong muốn trong useEffect hoặc useState.</li>
          <li>Kiểm tra việc sử dụng key trong danh sách (list rendering).</li>
          <li>Cảnh báo khi phát hiện bộ nhớ không được giải phóng (memory leak).</li>
          <li>Thực thi một số hàm như useEffect hoặc componentDidMount hai lần trong chế độ phát triển để kiểm tra tính an toàn.</li>
        </ul>
        
        <h3 className="text-xl font-medium mb-3">3. Lý do nên dùng StrictMode trong React</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Giúp phát hiện lỗi sớm trong quá trình lập trình.</li>
          <li>Hỗ trợ việc viết code React an toàn, dễ bảo trì và tuân thủ chuẩn mới.</li>
          <li>Giúp ứng dụng chuẩn bị tốt hơn cho các thay đổi trong React phiên bản tương lai.</li>
          <li>Không ảnh hưởng đến tốc độ hay hành vi của ứng dụng khi triển khai thực tế.</li>
        </ul>
      </Card>

      {/* Component Communication */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Làm sao để component cha nhận được dữ liệu từ component con</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Trong component cha, ta khai báo một <strong>hàm callback</strong> có nhiệm vụ nhận dữ liệu từ con.</li>
          <li>Truyền hàm đó xuống component con qua props.</li>
          <li>Trong component con, khi cần gửi dữ liệu lên, ta gọi hàm callback này và truyền dữ liệu làm đối số.</li>
          <li>Component cha sẽ nhận dữ liệu thông qua tham số của hàm callback và có thể lưu lại trong state hoặc xử lý theo nhu cầu.</li>
        </ul>
      </Card>

      {/* Feature-Sliced Design */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">7 layers trong Feature-Sliced Design</h2>
        <p className="mb-4">
          <strong>Trong Feature-Sliced Design (FSD)</strong> mã nguồn được chia thành <strong>7 layer</strong> (tầng) từ thấp đến cao như sau:
        </p>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">1. Shared</h3>
            <p>Chứa các phần <strong>tái sử dụng toàn cục</strong> (dùng chung cho toàn dự án). Bao gồm: UI components (button, input), helpers, constants, hooks, lib... Không phụ thuộc vào các layer khác.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">2. Entities</h3>
            <p>Đại diện cho <strong>các đối tượng cốt lõi trong domain</strong> (ví dụ: User, Product, Order). Chứa model, API, logic, UI liên quan đến từng entity. Là nền tảng để các tầng cao hơn sử dụng.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">3. Features</h3>
            <p>Gồm <strong>chức năng riêng biệt</strong> mà người dùng có thể thao tác được. Ví dụ: login, add-to-cart, like-post. Có thể sử dụng các entity và shared.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">4. Widgets</h3>
            <p>Là <strong>cụm giao diện phức tạp</strong> được ghép từ nhiều features hoặc entities. Ví dụ: thanh navigation, user profile card, comment section.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">5. Pages</h3>
            <p>Đại diện cho <strong>một trang hoàn chỉnh</strong> (route). Kết hợp các widgets và features để tạo UI hoàn chỉnh. Ví dụ: LoginPage, ProductPage.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">6. Processes</h3>
            <p>Mô tả <strong>luồng nghiệp vụ phức tạp</strong> kéo dài qua nhiều trang hoặc features. Ví dụ: quy trình đăng ký tài khoản, thanh toán nhiều bước.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">7. App</h3>
            <p>Là tầng cao nhất, khởi tạo toàn bộ ứng dụng. Bao gồm: routing, providers (Redux, Theme, QueryClient...), layout chính.</p>
          </div>
        </div>
      </Card>

      {/* Axios vs Fetch */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Tại sao dùng Axios mà không dùng Fetch</h2>
        <p className="mb-4">
          Axios được sử dụng thay cho Fetch vì nó mang lại sự tiện lợi và linh hoạt hơn trong việc gọi API, đặc biệt là trong các ứng dụng React hoặc dự án quy mô lớn.
        </p>
        
        <h3 className="text-xl font-medium mb-3">Ưu điểm của Axios:</h3>
        <ol className="list-decimal list-inside space-y-2">
          <li>Axios <strong>tự động chuyển đổi dữ liệu JSON</strong> từ response, không cần phải gọi response.json() như khi dùng Fetch.</li>
          <li>Axios <strong>xử lý lỗi trực quan hơn</strong>. Khi server trả về mã lỗi như 400 hoặc 500, Axios sẽ tự động ném lỗi, trong khi Fetch vẫn coi đó là phản hồi thành công nên phải kiểm tra thủ công bằng response.ok.</li>
          <li>Axios hỗ trợ <strong>timeout sẵn có</strong>, giúp dừng request nếu mất quá nhiều thời gian, trong khi Fetch cần tự cài đặt thông qua AbortController.</li>
          <li>Cho phép chặn request/response để thêm token, logging, xử lý lỗi chung…, Fetch không có sẵn tính năng này, phải tự viết middleware.</li>
          <li>Axios <strong>tự động thiết lập headers và serialize dữ liệu</strong> khi gửi yêu cầu POST hoặc PUT, còn Fetch yêu cầu người dùng phải tự JSON.stringify() và cấu hình headers thủ công.</li>
          <li>Axios <strong>hỗ trợ theo dõi tiến trình upload hoặc download</strong>, phù hợp cho các ứng dụng có thao tác với file (onUploadProgress, onDownloadProgress).</li>
          <li>Axios có <strong>khả năng tương thích tốt hơn với trình duyệt cũ và Node.js</strong>, trong khi Fetch chỉ hoạt động ổn định trên các trình duyệt hiện đại.</li>
        </ol>
      </Card>

      {/* Browser Storage */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Các loại Storage trong trình duyệt</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-medium mb-3">1. Local Storage</h3>
            <p className="mb-2"><strong>Khái niệm:</strong> Là nơi lưu trữ dữ liệu lâu dài trên trình duyệt, dữ liệu <strong>không bị mất khi tải lại trang hoặc đóng trình duyệt</strong>.</p>
            <p className="mb-2"><strong>Đặc điểm:</strong></p>
            <ul className="list-disc list-inside mb-3 ml-4">
              <li>Dung lượng: khoảng 5–10MB tùy trình duyệt.</li>
              <li>Chỉ lưu dữ liệu dạng chuỗi (string).</li>
              <li>Truy cập đồng bộ, chỉ chạy trên cùng domain.</li>
            </ul>
            <pre className="bg-gray-100 p-3 rounded text-sm">
{`localStorage.setItem("name", "Phuong");
const name = localStorage.getItem("name");
localStorage.removeItem("name");
localStorage.clear();`}
            </pre>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-3">2. Session Storage</h3>
            <p className="mb-2"><strong>Khái niệm:</strong> Giống Local Storage nhưng <strong>chỉ tồn tại trong một phiên trình duyệt (tab)</strong>. Khi đóng tab hoặc trình duyệt, dữ liệu sẽ mất.</p>
            <pre className="bg-gray-100 p-3 rounded text-sm">
{`sessionStorage.setItem("token", "abc123");
const token = sessionStorage.getItem("token");
sessionStorage.removeItem("token");`}
            </pre>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-3">3. Cookies</h3>
            <p className="mb-2"><strong>Khái niệm:</strong> Là dữ liệu nhỏ lưu trên trình duyệt, thường dùng cho <strong>xác thực (authentication)</strong> hoặc <strong>lưu trạng thái người dùng</strong>. Có thể được gửi kèm trong mỗi request đến server.</p>
            <p className="mb-2"><strong>Đặc điểm:</strong></p>
            <ul className="list-disc list-inside mb-3 ml-4">
              <li>Dung lượng nhỏ (khoảng 4KB).</li>
              <li>Có thể thiết lập thời gian hết hạn, domain, và quyền truy cập.</li>
              <li>Bảo mật thấp hơn nếu không mã hóa.</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-3">4. IndexedDB</h3>
            <p className="mb-2"><strong>Khái niệm:</strong> Là cơ sở dữ liệu <strong>NoSQL ngay trong trình duyệt</strong>, cho phép lưu dữ liệu lớn và phức tạp (object, file, blob).</p>
            <p className="mb-2"><strong>Đặc điểm:</strong></p>
            <ul className="list-disc list-inside mb-3 ml-4">
              <li>Dung lượng lớn (hàng trăm MB).</li>
              <li>Hỗ trợ truy vấn bất đồng bộ.</li>
              <li>Dùng cho ứng dụng offline, PWA, caching dữ liệu lớn.</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-3">5. Cache Storage (Service Worker Cache)</h3>
            <p className="mb-2"><strong>Khái niệm:</strong> Dùng để <strong>lưu trữ tài nguyên tĩnh</strong> (HTML, CSS, JS, hình ảnh) giúp ứng dụng hoạt động <strong>offline</strong> hoặc tải nhanh hơn.</p>
            <p className="mb-2"><strong>Đặc điểm:</strong></p>
            <ul className="list-disc list-inside ml-4">
              <li>Dùng nhiều trong <strong>Progressive Web Apps (PWA)</strong>.</li>
              <li>Quản lý thông qua Service Worker.</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* useEffect */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">useEffect hoạt động như thế nào</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-medium mb-3">1. Không có dependencies</h3>
            <pre className="bg-gray-100 p-3 rounded text-sm mb-2">
{`useEffect(() => {
  console.log("Chạy sau mỗi lần render");
});`}
            </pre>
            <ul className="list-disc list-inside ml-4">
              <li>Effect <strong>chạy sau mỗi lần render lại component</strong>, bao gồm cả lần đầu tiên.</li>
              <li>Nghĩa là <strong>mỗi lần state hoặc props thay đổi</strong>, React đều gọi lại hàm trong useEffect.</li>
              <li>Dùng trong trường hợp cần đồng bộ với mọi thay đổi (ít gặp, dễ gây lặp vô hạn nếu setState trong effect).</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-3">2. Có mảng dependencies rỗng []</h3>
            <pre className="bg-gray-100 p-3 rounded text-sm mb-2">
{`useEffect(() => {
  console.log("Chạy một lần khi component mount");
}, []);`}
            </pre>
            <ul className="list-disc list-inside ml-4">
              <li>Effect <strong>chỉ chạy một lần duy nhất</strong> sau khi component render lần đầu (giống componentDidMount).</li>
              <li>Thường dùng để <strong>gọi API lần đầu</strong>, <strong>đăng ký sự kiện</strong>, hoặc <strong>thiết lập kết nối</strong>.</li>
              <li>Nếu return một hàm cleanup, hàm đó sẽ chạy khi component bị <strong>unmount</strong>.</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-3">3. Có dependencies là một hoặc nhiều state/props</h3>
            <pre className="bg-gray-100 p-3 rounded text-sm mb-2">
{`useEffect(() => {
  console.log("Chạy khi count thay đổi");
}, [count]);`}
            </pre>
            <ul className="list-disc list-inside ml-4">
              <li>Effect chỉ chạy <strong>khi giá trị trong mảng dependencies thay đổi</strong>.</li>
              <li>React sẽ so sánh giá trị mới và cũ, nếu khác nhau → chạy lại effect.</li>
              <li>Dùng để thực hiện hành động phụ thuộc vào dữ liệu cụ thể (ví dụ: cập nhật tiêu đề khi count thay đổi).</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-3">4. Cleanup function (hàm dọn dẹp)</h3>
            <pre className="bg-gray-100 p-3 rounded text-sm mb-2">
{`useEffect(() => {
  const id = setInterval(() => console.log("Tick"), 1000);
  return () => clearInterval(id);
}, []);`}
            </pre>
            <ul className="list-disc list-inside ml-4">
              <li>Hàm return trong useEffect được gọi để <strong>dọn dẹp</strong> trước khi component unmount hoặc trước khi chạy effect mới.</li>
              <li>Giúp <strong>tránh rò rỉ bộ nhớ</strong> (memory leak) khi dùng timer, event listener, hay subscription.</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* useState */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">useState là gì và cách sử dụng</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-medium mb-3">1. Khái niệm</h3>
            <p>
              useState là một <strong>Hook cơ bản trong React</strong> được dùng để <strong>khai báo và quản lý state (trạng thái)</strong> bên trong functional component.
              Nó cho phép component <strong>lưu trữ giá trị thay đổi theo thời gian</strong> và <strong>tự động re-render</strong> khi giá trị đó cập nhật.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-3">2. Cú pháp và cách sử dụng</h3>
            <pre className="bg-gray-100 p-3 rounded text-sm mb-2">
{`import { useState } from "react";

function Example() {
  const [count, setCount] = useState(0); // 0 là giá trị khởi tạo
}`}
            </pre>
            <ul className="list-disc list-inside ml-4">
              <li><code>count</code>: giá trị hiện tại của state.</li>
              <li><code>setCount</code>: hàm dùng để cập nhật giá trị state.</li>
              <li><code>useState(0)</code>: khởi tạo state với giá trị ban đầu là 0.</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-3">3. Những điều xảy ra khi sử dụng giá trị và hàm của useState</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Khi gọi <code>setCount()</code>, React không cập nhật ngay lập tức mà đánh dấu cần re-render component.</li>
              <li>Sau khi render lại, biến <code>count</code> mang giá trị mới.</li>
              <li>Nếu gọi <code>setCount()</code> nhiều lần trong cùng một render, React có thể gộp (batch) lại để tối ưu hiệu năng.</li>
              <li><code>useState</code> là hook độc lập cho từng component, mỗi instance có state riêng, không ảnh hưởng lẫn nhau.</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}