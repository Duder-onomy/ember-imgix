import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('imgix-image', 'Integration | Component | imgix image', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{imgix-image }}`);
  assert.ok(this.$());
});

test('it renders event more better', function(assert) {
  this.render(hbs`<div style='width:200px;height:200px;'>{{imgix-image path='/users/1.png' }}</div>`);

  let url = new URL(this.$('img').attr('src'));
  assert.equal(this.$().text().trim(), '');
  assert.equal(url.pathname, '/users/1.png');
});

test('it allows setting the alt attribute', function(assert) {
  this.render(hbs`<div style='width:200px;height:200px;'>{{imgix-image path='/users/1.png' alt='User 1'}}</div>`);

  let alt = this.$('img').attr('alt');
  assert.equal(alt, 'User 1');
});

test('it renders the correct path', function(assert) {
  this.render(hbs`<div style='width:200px;height:200px;'>{{imgix-image path='/users/1.png'}}</div>`);

  assert.ok(this.$('img').attr('src').indexOf('https://assets.imgix.net/users/1.png') > -1);
  assert.ok(this.$('img').attr('src').indexOf('w=200') > -1);
});

test('it builds the default URL', function(assert) {
  this.render(hbs`<div style='width:1280px;height:200px;'>{{imgix-image path='/users/1.png'}}</div>`);

  const url = new URL(this.$('img').attr('src'));

  assert.equal(url.searchParams.get('w'), '1280');
  assert.equal(url.pathname, '/users/1.png');
  assert.equal(url.searchParams.get('fit'), 'crop');
  assert.equal(url.searchParams.get('crop'), 'faces');
});

test('it maintains any query parameters passed in', function(assert) {
  this.render(hbs`<div style='width:1280px;height:200px;'>{{imgix-image path='/users/1.png?sat=100'}}</div>`);

  let url = new URL(this.$('img').attr('src'));
  assert.equal(url.searchParams.get('sat'), '100');
  assert.equal(url.searchParams.get('w'), '1280');
});

test('it renders with an aspect ratio', function(assert) {
  this.render(hbs`<div style='width:1280px;height:200px;'>{{imgix-image path='/users/1.png' aspectRatio=1.3333}}</div>`);

  assert.equal(this.$().text().trim(), '');

  let url = new URL(this.$('img').attr('src'));

  assert.equal(url.searchParams.get('w'), '1280');
  assert.equal(url.searchParams.get('h'), '960');
});

test('it respects passed in `crop` and `fit` values', function(assert) {
  assert.expect(2);
  this.render(hbs`<div style='width:1280px;height:200px;'>{{imgix-image path='/users/1.png?sat=100&fit=min&crop=top,left'}}</div>`);

  let url = new URL(this.$('img').attr('src'));
  assert.equal(url.searchParams.get('fit'), 'min');
  assert.equal(url.searchParams.get('crop'), 'top,left');
});

test('it respects `crop` and `fit` values passed as attributes', function(assert) {
  assert.expect(2);
  this.render(hbs`<div style='width:1280px;height:200px;'>{{imgix-image path='/users/1.png' crop='top,left' fit='min'}}</div>`);

  let url = new URL(this.$('img').attr('src'));

  assert.equal(url.searchParams.get('crop'), 'top,left');
  assert.equal(url.searchParams.get('fit'), 'min');
});

test('it allows setting the alt attribute', function(assert) {

  this.render(hbs`<div style='width:1280px;height:200px;'>{{imgix-image path='/users/1.png' alt='User 1'}}</div>`);

  let alt = this.$('img').attr('alt');
  assert.equal(alt, 'User 1');
});

test('it allows passing ANY imgix parameter as an option hash', function(assert) {
  assert.expect(2);
  this.render(hbs`<div style='width:1280px;height:200px;'>{{imgix-image path='/users/1.png' options=(hash exp=20 invert=true)}}</div>`);

  let url = new URL(this.$('img').attr('src'));

  assert.equal(url.searchParams.get('exp'), 20);
  assert.equal(url.searchParams.get('invert'), 'true');
});
