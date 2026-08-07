document.addEventListener("DOMContentLoaded", () => {
    // Cấu hình chung cho các đường vẽ
    const commonOptions = {
        path: 'fluid',
        startSocket: 'right',
        endSocket: 'left',
        size: 2,
        dropShadow: true,
        startPlug: 'behind',
        endPlug: 'arrow1',
        endPlugSize: 1.5
    };

    // Định nghĩa màu cho từng line
    const frontendToMiddleware = { ...commonOptions, color: '#8b5cf6' }; // Tím
    const middlewareToBackend = { ...commonOptions, color: '#f59e0b' };  // Cam
    const backendToDatabase = { ...commonOptions, color: '#3b82f6' };    // Xanh dương

    let lines = [];

    // Hàm vẽ sơ đồ
    function drawLines() {
        // Xóa lines cũ nếu có (dành cho responsive)
        if (lines.length > 0) {
            lines.forEach(line => line.remove());
            lines = [];
        }

        // 1. Nối Frontend -> API Gateway
        lines.push(new LeaderLine(
            document.getElementById('node-frontend'),
            document.getElementById('node-gateway'),
            frontendToMiddleware
        ));

        // 2. Nối API Gateway -> 4 Backend modules
        const backendNodes = ['node-lesson', 'node-3d', 'node-game', 'node-quiz'];
        backendNodes.forEach(id => {
            lines.push(new LeaderLine(
                document.getElementById('node-gateway'),
                document.getElementById(id),
                middlewareToBackend
            ));
        });

        // 3. Nối 4 Backend modules -> Database
        backendNodes.forEach(id => {
            lines.push(new LeaderLine(
                document.getElementById(id),
                document.getElementById('node-db'),
                backendToDatabase
            ));
        });
    }

    // Đợi layout render xong để LeaderLine tính toán tọa độ chính xác
    setTimeout(drawLines, 200);

    // Cập nhật lại vị trí các đường nối khi người dùng thu phóng/đổi kích thước cửa sổ
    window.addEventListener('resize', () => {
        lines.forEach(line => line.position());
    });
});
