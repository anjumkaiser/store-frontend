# Temporary makefile
.SILENT:

PUGJS=pug -O "{doctype: 'html'}"

all:	src/index.html \
	src/app/app.component.html \
	src/app/views/navbar/navbar.component.html \
	src/app/views/user-profile/user-profile.component.html \
	src/app/views/authenticate/authenticate.component.html \
	src/app/views/authenticate-password/authenticate-password.component.html \
	src/app/views/authenticate-callback/authenticate-callback.component.html \
	src/app/views/product-detail/product-detail.component.html \
	src/app/views/product-list/product-list.component.html \
	src/app/views/backoffice-dashboard/backoffice-dashboard.component.html \
	src/app/views/backoffice-country-list/backoffice-country-list.component.html \
	src/app/views/backoffice-country-edit/backoffice-country-edit.component.html \
	src/app/views/backoffice-product-edit/backoffice-product-edit.component.html \
	src/app/views/backoffice-product-list/backoffice-product-list.component.html

src/index.html:			src/index.pug
	$(PUGJS) $<

src/app/app.component.html:	src/app/app.component.pug
	$(PUGJS) $<

src/app/views/authenticate/authenticate.component.html:	src/app/views/authenticate/authenticate.component.pug
	$(PUGJS) $<

src/app/views/authenticate-password/authenticate-password.component.html:	src/app/views/authenticate-password/authenticate-password.component.pug
	$(PUGJS) $<

src/app/views/authenticate-callback/authenticate-callback.component.html:	src/app/views/authenticate-callback/authenticate-callback.component.pug
	$(PUGJS) $<

src/app/views/product-list/product-list.component.html:	src/app/views/product-list/product-list.component.pug
	$(PUGJS) $<

src/app/views/product-detail/product-detail.component.html:	src/app/views/product-detail/product-detail.component.pug
	$(PUGJS) $<

src/app/views/backoffice-product-edit/backoffice-product-edit.component.html:	src/app/views/backoffice-product-edit/backoffice-product-edit.component.pug
	$(PUGJS) $<

src/app/views/navbar/navbar.component.html:	src/app/views/navbar/navbar.component.pug
	$(PUGJS) $<

src/app/views/user-profile/user-profile.component.html:	src/app/views/user-profile/user-profile.component.pug
	$(PUGJS) $<

src/app/views/backoffice-dashboard/backoffice-dashboard.component.html: src/app/views/backoffice-dashboard/backoffice-dashboard.component.pug
	$(PUGJS) $<

src/app/views/backoffice-product-list/backoffice-product-list.component.html: src/app/views/backoffice-product-list/backoffice-product-list.component.pug
	$(PUGJS) $<

src/app/views/backoffice-country-list/backoffice-country-list.component.html: src/app/views/backoffice-country-list/backoffice-country-list.component.pug
	$(PUGJS) $<

src/app/views/backoffice-country-edit/backoffice-country-edit.component.html: src/app/views/backoffice-country-edit/backoffice-country-edit.component.pug
	$(PUGJS) $<

