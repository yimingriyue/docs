
taskkill  /f /im simple-http-server.exe
::start "" python -m http.server 8000 --directory I:\Users\Documents\GitHub\daohang\

start "" simple-http-server -i -p 8000 I:\Users\Documents\GitHub\docs\

start "" "http://localhost:8000"