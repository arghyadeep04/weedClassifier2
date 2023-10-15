from http.server import HTTPServer, BaseHTTPRequestHandler 
import json 
from cgi import parse_header, parse_multipart
from urllib.parse import parse_qs
from deepweeds import return_back
class APIHandler(BaseHTTPRequestHandler): 
    def parse_POST(self):
        ctype, pdict = parse_header(self.headers['content-type'])
        if ctype == 'multipart/form-data':
            postvars = parse_multipart(self.rfile, pdict)
        elif ctype == 'application/x-www-form-urlencoded':
            length = int(self.headers['content-length'])
            postvars = parse_qs(
                    self.rfile.read(length), 
                    keep_blank_values=1)
        else:
            postvars = {}
        return postvars
    def do_GET(self): 
        if self.path == '/getoutput':
            url=self.headers['url']
            print(url)
            self.send_response(200) 
            self.send_header('Content-Type', 'application/json') 
            self.send_header('Access-Control-Allow-Origin','*')
            self.send_header('Vary','Origin')
            self.end_headers() 
            # fruits = ['apple', 'banana', 'mango'] 
            output=return_back(url)
            print("OUT",output)
            self.wfile.write(json.dumps({'answer':output}).encode()) 
        else: 
            self.send_response(404) 
    # def do_POST(self):
    #     if(self.path=="/testpost"):
    #         postvars=self.parse_POST()
    #         print(postvars)
    #         self.send_response(200) 
    #         self.send_header('Content-Type', 'application/json') 
    #         self.end_headers() 
    #         # fruits = ['apple', 'banana', 'mango'] 
    #         self.wfile.write(json.dumps(postvars).encode())
    #     else:
    #         self.send_response(404) 

httpd = HTTPServer(('localhost', 8000), APIHandler) 
httpd.serve_forever()