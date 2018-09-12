# Temporary makefile
.SILENT:

PUGJS=pug -O "{doctype: 'html'}"

all:	src/index.html \
	src/app/app.component.html \
	src/app/views/navbar/navbar.component.html \
	src/app/views/user-profile/user-profile.component.html \
	src/app/views/authenticate/authenticate.component.html \
	src/app/views/product-detail/product-detail.component.html \
	src/app/views/edit-product/edit-product.component.html \
	src/app/views/product-list/product-list.component.html


src/index.html:			src/index.pug
	$(PUGJS) $<

src/app/app.component.html:	src/app/app.component.pug
	$(PUGJS) $<

src/app/views/authenticate/authenticate.component.html:	src/app/views/authenticate/authenticate.component.pug
	$(PUGJS) $<

src/app/views/product-list/product-list.component.html:	src/app/views/product-list/product-list.component.pug
	$(PUGJS) $<

src/app/views/product-detail/product-detail.component.html:	src/app/views/product-detail/product-detail.component.pug
	$(PUGJS) $<

src/app/views/edit-product/edit-product.component.html:	src/app/views/edit-product/edit-product.component.pug
	$(PUGJS) $<

src/app/views/navbar/navbar.component.html:	src/app/views/navbar/navbar.component.pug
	$(PUGJS) $<

src/app/views/user-profile/user-profile.component.html:	src/app/views/user-profile/user-profile.component.pug
	$(PUGJS) $<
