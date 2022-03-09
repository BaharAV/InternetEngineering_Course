import java.io.FileWriter;
import java.io.OutputStreamWriter;
import java.net.Socket;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    private static final int PORT = 80;
    private static final String stidheader = "x-student-id: ";
    private static final String CRLF = "\r\n";
    private static final String version = "HTTP/1.0";
    private static String studentId = "";
    private static String input = "";
    private static Scanner scanner = new Scanner(System.in);
    private static Pattern URL_REGEX = Pattern.compile("(?i)(http://)?([-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b)([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)");
    private static Set<String> METHODS = Set.of("GET", "POST", "PATCH", "PUT", "DELETE");
    private static String method;
    private static String hostname;
    private static String resource;
    private static int filenumberhtml = 1;
    private static int filenumberjson = 1;

    public static String MakeRequestBodyAndGetResponse() {
        try {
            Socket socket = new Socket(hostname, PORT);
            OutputStreamWriter output = new OutputStreamWriter(socket.getOutputStream());
            StringBuilder sb = new StringBuilder();
            sb.append(method).append(" ").append(resource).append(" ").append(version).append(CRLF);
            sb.append("Accept: */*").append(CRLF);
            if (!studentId.isEmpty()) {
                sb.append(stidheader).append(studentId).append(CRLF);
            }
            sb.append(CRLF);
            output.write(sb.toString());
            output.flush();
            Scanner scannersocket = new Scanner(socket.getInputStream());
            StringBuilder inputsb = new StringBuilder();
            while (scannersocket.hasNextLine()) {
                inputsb.append(scannersocket.nextLine()).append("\n");
            }
            return inputsb.toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public static Response MakeResponseBody(String response) {
//        System.out.println(response);
        String header = response.substring(0, response.indexOf("\n\n"));
        String first_line_of_header = header.substring(0, header.indexOf("\n"));
        List<String> first_line_of_header_content = Arrays.asList(first_line_of_header.split(" ", 3));
        String version = first_line_of_header_content.get(0);
        int code = Integer.valueOf(first_line_of_header_content.get(1));
        String reason = first_line_of_header_content.get(2);
        String headers = header.substring(header.indexOf("\n") + 1);
        List<String> headers_lines = Arrays.asList(headers.split("\n"));
        Map<String, String> headers_map = new HashMap<>();
        for (int i = 0; i < headers_lines.size(); i++) {
            String headers_line = headers_lines.get(i);
            List<String> header_line_contents = Arrays.asList(headers_line.split(": ", 2));
            headers_map.put(header_line_contents.get(0).toLowerCase(), header_line_contents.get(1));
//            if(header_line_contents.get(0).equalsIgnoreCase("Content-Type")){
//                break;
//            }
        }
        String body = response.substring(response.indexOf("\n\n") + 2);
        Response responsecls = new Response(version, code, reason, body, headers_map);
        return responsecls;
    }

    public static void Result(Response response) {
        System.out.println(response.getCode() + " : " + response.reason);
        if (response.getCode() > 199 && response.getCode() < 300)
            System.out.println("2XX type!");
        else if (response.getCode() > 299 && response.getCode() < 400)
            System.out.println("3XX type!");
        else if (response.getCode() > 399 && response.getCode() < 500)
            System.out.println("4XX type!");
        else if (response.getCode() > 499 && response.getCode() < 600)
            System.out.println("5XX type!");
        String conentType = response.getHeaders_map().get("content-type");
        try {
            if (conentType.contains("text/plain")) {
                System.out.println(response.getBody());
            } else if (conentType.contains("text/html")) {
                if (response.getBody().contains("<<x-student-id>>")) {
                    System.out.println("set student header please!");
                }
                String filenumberstr = String.valueOf(filenumberhtml);
                filenumberhtml++;
                FileWriter myWriter = new FileWriter("html" + filenumberstr + ".html");
                myWriter.write(response.getBody());
                myWriter.close();
            } else if (conentType.contains("application/json")) {
                String filenumberstr = String.valueOf(filenumberjson);
                filenumberjson++;
                FileWriter myWriter = new FileWriter("json" + filenumberstr + ".json");
                myWriter.write(response.getBody());
                myWriter.close();
            } else {
                System.out.println("not supported!");
                System.out.println(response.getBody());
            }
        } catch (Exception e) {
//            System.out.println("error happend!");
        }
    }

    public static void AddingStudentId() {
        System.out.println("enetr student id");
        input = scanner.nextLine();
        input.toLowerCase().trim();
        studentId = input;
    }

    public static void RemovingStudentId() {
        studentId = "";
    }

    public static void main(String[] args) {
        while (true) {
            System.out.println("enter a command or url:");
            input = scanner.nextLine();
            input = input.trim().toLowerCase();
            if (input.equals("exit")) {
                break;
            }
            if (input.equals("set-student-id-header")) {
                AddingStudentId();
                continue;
            }
            if (input.equals("remove-student-id-header")) {
                RemovingStudentId();
                continue;
            }
            Matcher result = URL_REGEX.matcher(input);
            if (result.matches()) {
                System.out.println("enter http method");
                System.out.println("GET for get method,\n" + "POST for post method,\n" +
                        "PUT for put method,\n" + "PATCH for patch method,\n" +
                        "DELETE for delete methode\n");
                method = scanner.nextLine().trim().toUpperCase();
                if (!METHODS.contains(method)) {
                    System.out.println("bad method");
                    continue;
                }
//                System.out.println("matches: ");
                hostname = result.group(2);
                resource = result.group(3);
                if (resource.isEmpty()) {
                    resource = "/";
                }
                String responsestr = MakeRequestBodyAndGetResponse();
                Response response = MakeResponseBody(responsestr);
                Result(response);
            }
        }

    }
}
