# Temporary makefile
.SILENT:

PUGJS=pug -O "{doctype: 'html'}"

all:	src/index.html \
	src/app/app.component.html \
	src/app/navbar/navbar.component.html \
	src/app/user-profile/user-profile.component.html \
	src/app/authenticate/authenticate.component.html \
	src/app/product-detail/product-detail.component.html \
	src/app/product-list/product-list.component.html


src/index.html:			src/index.pug
	$(PUGJS) $<

src/app/app.component.html:	src/app/app.component.pug
	$(PUGJS) $<

src/app/authenticate/authenticate.component.html:	src/app/authenticate/authenticate.component.pug
	$(PUGJS) $<

src/app/product-list/product-list.component.html:	src/app/product-list/product-list.component.pug
	$(PUGJS) $<

src/app/product-detail/product-detail.component.html:	src/app/product-detail/product-detail.component.pug
	$(PUGJS) $<

src/app/navbar/navbar.component.html:	src/app/navbar/navbar.component.pug
	$(PUGJS) $<

src/app/user-profile/user-profile.component.html:	src/app/user-profile/user-profile.component.pug
	$(PUGJS) $<
