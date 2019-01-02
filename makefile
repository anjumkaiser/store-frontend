# Temporary makefile
.SILENT:

PUGJS=pug -O "{doctype: 'html'}"

all:	src/index.html


src/index.html:			src/index.pug
	$(PUGJS) $<
