import java.util.HashMap;
import java.util.Map;

public class Response {
    String version;
    int code;
    String reason;
    String body;
    Map<String, String> headers_map;

    public String getVersion() {
        return version;
    }

    public int getCode() {
        return code;
    }

    public String getReason() {
        return reason;
    }

    public String getBody() {
        return body;
    }

    public Map<String, String> getHeaders_map() {
        return headers_map;
    }

    public Response(String version, int code, String reason, String body, Map<String, String> headers_map) {
        this.version = version;
        this.code = code;
        this.reason = reason;
        this.body = body;
        this.headers_map = headers_map;
    }
}
