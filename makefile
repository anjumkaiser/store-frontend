# Temporary makefile
.SILENT:

PUGJS=pug -O "{doctype: 'html'}"

all:	src/index.html \
	src/app/app.component.html \
	src/app/product-list/product-list.component.html


src/index.html:			src/index.pug
	$(PUGJS) $<

src/app/app.component.html:	src/app/app.component.pug
	$(PUGJS) $<

src/app/product-list/product-list.component.html:	src/app/product-list/product-list.component.pug
	$(PUGJS) $<
