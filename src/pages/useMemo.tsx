import { useMemo, useState } from "react";

export default function UseMemoExp() {
  console.log("useMemo render");
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  const cal = useMemo(() => {
    console.log("Calculating...");
    let total = 0;
    for (let i = 0; i < 1000000000; i++) {
      total += count;
    }
    return total;
  }, [count]);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">UseMemo Example</h1>
      <p className="text-gray-600 mb-4">
        useMemo cache kết quả tính toán nặng. Chỉ tính lại khi dependency thay đổi.
        Thử gõ vào input → không tính lại. Chỉ khi bấm Increase mới tính lại.
      </p>

      <div className="space-y-4">
        <div className="p-4 bg-blue-50 rounded">
          <h3 className="text-lg font-semibold">Result: {cal}</h3>
        </div>

        <button
          onClick={() => setCount(count + 1)}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          Increase count
        </button>

        <div>
          <label className="block text-sm font-medium mb-2">
            Name (không trigger tính toán lại):
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded w-full outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập gì đó..."
          />
        </div>
      </div>
    </div>
  );
}
