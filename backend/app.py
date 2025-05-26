from http.server import HTTPServer, SimpleHTTPRequestHandler
import json
import sqlite3
from urllib.parse import parse_qs, urlparse

class RequestHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urlparse(self.path)
        
        # Serve static files from frontend directory
        if self.path == '/':
            self.path = '/frontend/pages/index.html'
        elif not self.path.startswith('/api/'):
            self.path = '/frontend' + self.path
            
        try:
            return SimpleHTTPRequestHandler.do_GET(self)
        except:
            self.send_error(404, "File not found")

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data.decode('utf-8'))

        if self.path == '/api/login':
            # Handle login logic here
            response = {'status': 'success', 'message': 'Login endpoint'}
        elif self.path == '/api/register':
            # Handle registration logic here
            response = {'status': 'success', 'message': 'Register endpoint'}
        else:
            response = {'status': 'error', 'message': 'Invalid endpoint'}

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(response).encode('utf-8'))

def run_server(port=8000):
    server_address = ('', port)
    httpd = HTTPServer(server_address, RequestHandler)
    print(f"Server running on port {port}")
    httpd.serve_forever()

if __name__ == '__main__':
    run_server()
