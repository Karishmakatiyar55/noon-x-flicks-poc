import pathlib
r=pathlib.Path(__file__).parent
h=(r/"src/shell.html").read_text()
h=h.replace("/*CSS*/",(r/"src/font.css").read_text()+(r/"src/app.css").read_text()).replace("/*DATA*/",(r/"src/img.js").read_text()+(r/"src/data.js").read_text()).replace("/*APP*/",(r/"src/app.js").read_text())
(r/"index.html").write_text(h); print(len(h))
