yarn add elasticsearch get-json

Có hai kiểu dữ liệu:
- constituencies
- petitions

Kibana dùng để view elastic search
# Khái niệm
Là công cụ tìm kiếm với nhiều REST API đơn giản có khả năng phân tích dữ liệu và lưu trữ tất cả dữ liệu dưới dạng:
  + texttextual
  + digital
  + geospatial
  + structured
  + unstructured
một cách nhanh chóng near real time
Phân tán thời gian thực, có khả năng mở rộng cao, hoạt động dựa trên nền tảng Apache Lucene
petabyte dữ liệu có cấu trúc và không có cấu trúc. Nó cũng có thể sử dụng thay thế cho các DB lưu trữ dữ liệu như mongoDB, ravenDB. Sử dụng kính không chuẩn hóa để cải thiện hiệu suất tìm kiếm.

# Khi nào cần sử dụng:
  + Searching for pure text (textual search): tìm kiếm text thông thường.
  + Searching text and structured data (product search by name + properties): tìm kiếm text và dữ liệu có cấu trúc.
  + Data aggregate, security analysis of business data: tổng hợp dữ liệu, phân tích bảo mật, phân tích dữ liệu kinh doanh, lưu trữ số liệu lớn.
  + Logging and console.log() analytic: ghi lại quá trình hoạt động và phân tích nó.
  + Application performance monitoring: giám sát hiệu nắng ứng dụng.
  + infrastucture indicators and containner monitoring.
  + Geo search: tìm kiếm tọa độ, phân tích và trực quan hóa dữ liệu không gian địa lý.
  + JSON document storage: lưu trữ dữ liệu JSON.

# Thành phần:
  + Node: là một instance (server) đơn lẻ duy nhất đang chạy của Elasticsearch. Nơi lưu trữ dữ liệu, tham gia thực hiện đánh index của cluster và thực hiện tìm kiếm.
  + Cluster: Là tập hợp nhiều nodes hoạt động cùng nhau, có khả năng tìm kiếm và lập chỉ mục trên tất cả các nodes cho toàn bộ dữ liệu. Chức năng chính là quyết định xem shards nào được phân bố cho Node và khi nào di chuyển các Node để cân bằng cluster.
  + Document: là một đơn vị cơ bản của Elastic search: đối tượng JSON, với một số các dữ liệu cụ thể. Mỗi document thuốc 1 type nằm trong 1 chỉ mục
  + Type: là danh mục của chỉ mục cho phéo lưu trữ các loại dữ liệu khác nhau trong cùng một chỉ mục.
  + Index: là tập hợp các loại document khác nhau và các thuộc tính của chúng, giúp lưu trữ một lượng lớn dữ liệu có thể vượt qua giới hạn phần cứng của node làm chậm quá trình phản hồi request từ các node đơn. Do vậy Index sử dụng khái niện shards (phân đoạn) để chia nhỏ thành nhiều phần giúp cải thiện hiệu suất
  + Shard: các index được chia theo chiều ngang thành các shard, mỗi shard chứa tất cả các thuộc tính của document nhưng chứa ít đối tượng JSON hơn index. Sự phân tách ngang làm cho shard là một node đọc lập, có thể lưu trữ bất kỳ node nào. Do vậy, một node có thể có nhiều Shard, vì thế Shard sẽ là đối tượng nhỏ nhất, hoạt động ở mức thấp nhất, đống vai trò lưu trữ dữ liệu.
    - Shard rất quan trọng vì: có thể phân theo chiều ngang mở rộng khối lượng bản ghi, cho phép phân tán và hoạt động song song trên các phân đoạn, nhờ đó tăng hiệu suất làm việc.
    Mối index sẽ có 5 primary Shards và mỗi primary shards sẽ có 1 replica shards.
    Primary
    Replica

# Cách hoạt động của Elastic search:
Hoạt động trên một server riêng biệt theo có chế của Restful phục vụ cho việc tìm kiếm.
Đầu tiên dữ liệu thô (raw data) vào Elastic search từ nhiều ngồn như console.log(), system indicators và webapp sẽ được phân tích, xử lý, bình thường hóa (normalizes) và làm phong phú thêm (enriches) trong quá trình nhập liệu (data ingestion) trước khi được lập chỉ mục index. Và đẩy server elastic search bước thứ 2

Cuối cùng, sau khi dữ liệu được lập chỉ mục, người dùng có thể tạo các truy xuất văn bản phức tạp từ dữ liệu này và sử dụng tập hợp (aggregations) để xuất các bản tóm tắt phức tạp của dữ liệu hay nói ngắn gọn là lấy data từ server Elasticsearch.

# Ưu nhược điểm
  + Cho phép tìm dữ liệu nhanh, gần real time Apache Lucene vượt trội trong mảng fulltext search.
  + fuzzy search: tìm kiếm mờ có thể tìm khi sai lỗi chính tả
  + Hỗ trọ hầu hết các kiểu dữ liệu.
  + dễ hồi phục dữ liệu.
# Nhược điểm
  + Không cũng cấp khả năng nào cho việc xác thực hay cấp quyền
  + thiết kế có việc tìm kiếm nên thường không được dùng chi db chính. Không mạnh CRUD thường song song với 1 dữ liệu.
  + Không có transaction nên không thể đảm bảo tính toàn vẹn của dữ liệu.
  + Không phù hợp với hệ thống thưỡng xuyên cập nhật dữ liệ, sẽ rất tốn chi phí.

Cluster = DB
Shard = Shard
Index = Table
Field = Column
Document = Row

Api tìm kiếm:
https://viblo.asia/p/cach-tao-index-va-mot-so-truy-van-pho-bien-trong-elasticsearch-1VgZvO39lAw
GET /_search?q={keyword}
GET /_search?q={field_name}:{keyword}
GET /_search
{
    "query": {
        "multi_match" : {
            "query" : {keyword},
            "fields" : ["_all"]
        }
    }
}

# Nodejs file beat (logging)
https://www.elastic.co/guide/en/cloud/current/ec-getting-started-search-use-cases-node-logs.html
yarn add winston
yarn add @elastic/ecs-winston-format
yarn add got
