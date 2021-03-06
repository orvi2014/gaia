/* global applyCache */
/* global Cache */

'use strict';

requireApp('communications/contacts/js/utilities/performance_helper.js');
requireApp('communications/contacts/js/bootstrap.js');

const DUMMY_CONTACT_UUID = '06eecb011f424a97aaa615c26ef66e0c';
const ANOTHER_DUMMY_CONTACT_UUID = 'c7e3e90e2d8d4ade872ba3575deef54d';
const YET_ANOTHER_DUMMY_CONTACT_UUID = '2ac02c47e2984c07a81476e5ae8f40d7';

// Cache of a contact named "Dummy"
const VALID_CACHE_ONE_CONTACT = { content: [
  {
    'elementName': 'section',
    'attributes': [
      {
        'name': 'id',
        'value': 'section-group-D'
      },
      {
        'name': 'class',
        'value': 'group-section'
      }
    ],
    'innerHTML':
      `<header aria-labelledby=\"contacts-listed-abbr-D\" class=\"\"
               id=\"group-D\">
         <abbr id=\"contacts-listed-abbr-D\" aria-hidden=\"true\"
               title=\"Contacts listed D\">D</abbr>
      </header>
      <ol data-group=\"D\" id=\"contacts-list-D\"
          aria-labelledby=\"contacts-listed-abbr-D\" role=\"listbox\">
        <li data-cache=\"true\" data-rendered=\"true\"
            data-updated=\"1424785158782\" class=\"contact-item\"
            data-group=\"D\" role=\"option\"
            data-uuid=\"${DUMMY_CONTACT_UUID}\">
            <label class=\"contact-checkbox pack-checkbox\">
              <input value=\"${DUMMY_CONTACT_UUID}\" name=\"selectIds[]\"
                     type=\"checkbox\">
              <span></span>
            </label>
            <p class=\"contact-text\">
              <bdi><strong>Dummy</strong></bdi>
            </p>
        </li>
      </ol>`
  }]
};

// Cache with contacts "Dummy", "AnotherDummy" and "YetAnotherDummy"
const VALID_CACHE_MULTIPLE_CONTACTS = { content: [{
  'elementName': 'section',
  'attributes': [
    {
      'name': 'id',
      'value': 'section-group-A'
    },
    {
      'name': 'class',
      'value': 'group-section'
    }
  ],
  'innerHTML':
    `<header aria-labelledby=\"contacts-listed-abbr-A\" class=\"\"
             id=\"group-A\">
       <abbr id=\"contacts-listed-abbr-A\" aria-hidden=\"true\"
             title=\"Contacts listed A\">A</abbr>
    </header>
    <ol data-group=\"A\" id=\"contacts-list-A\"
        aria-labelledby=\"contacts-listed-abbr-A\" role=\"listbox\">
      <li data-cache=\"true\" data-rendered=\"true\"
          data-updated=\"1424803481298\" class=\"contact-item\"
          data-group=\"A\" role=\"option\"
          data-uuid=\"${ANOTHER_DUMMY_CONTACT_UUID}\">
        <label class=\"contact-checkbox pack-checkbox\">
          <input value=\"${ANOTHER_DUMMY_CONTACT_UUID}\" name=\"selectIds[]\"
                  type=\"checkbox\">
          <span></span>
        </label>
        <p class=\"contact-text\">
          <bdi><strong>AnotherDummy</strong></bdi>
        </p>
      </li>
    </ol>`
}, {
  'elementName': 'section',
  'attributes': [
    {
      'name': 'id',
      'value': 'section-group-D'
    },
    {
      'name': 'class',
      'value': 'group-section'
    }
  ],
  'innerHTML':
    `<header aria-labelledby=\"contacts-listed-abbr-D\" class=\"\"
             id=\"group-D\">
       <abbr id=\"contacts-listed-abbr-D\" aria-hidden=\"true\"
             title=\"Contacts listed D\">D</abbr>
    </header>
    <ol data-group=\"D\" id=\"contacts-list-D\"
        aria-labelledby=\"contacts-listed-abbr-D\" role=\"listbox\">
      <li data-cache=\"true\" data-rendered=\"true\"
          data-updated=\"1424803471199\" class=\"contact-item\"
          data-group=\"D\" role=\"option\"
          data-uuid=\"${DUMMY_CONTACT_UUID}\">
        <label class=\"contact-checkbox pack-checkbox\">
          <input value=\"${DUMMY_CONTACT_UUID}\" name=\"selectIds[]\"
                 type=\"checkbox\">
          <span></span>
        </label>
        <p class=\"contact-text\">
          <bdi><strong>Dummy</strong></bdi>
        </p>
      </li>
    </ol>`
}, {
  'elementName': 'section',
  'attributes': [
    {
      'name': 'id',
      'value': 'section-group-Y'
    },
    {
      'name': 'class',
      'value': 'group-section'
    }
  ],
  'innerHTML':
    `<header aria-labelledby=\"contacts-listed-abbr-Y\" class=\"\"
             id=\"group-Y\">
       <abbr id=\"contacts-listed-abbr-Y\" aria-hidden=\"true\"
             title=\"Contacts listed Y\">Y</abbr>
     </header>
     <ol data-group=\"Y\" id=\"contacts-list-Y\"
         aria-labelledby=\"contacts-listed-abbr-Y\" role=\"listbox\">
       <li data-cache=\"true\" data-rendered=\"true\"
           data-updated=\"1424803496924\" class=\"contact-item\"
           data-group=\"Y\" role=\"option\"
           data-uuid=\"${YET_ANOTHER_DUMMY_CONTACT_UUID}\">
         <label class=\"contact-checkbox pack-checkbox\">
           <input value=\"${YET_ANOTHER_DUMMY_CONTACT_UUID}\"
                  name=\"selectIds[]\" type=\"checkbox\">
           <span></span>
         </label>
         <p class=\"contact-text\">
           <bdi><strong>YetAnotherDummy</strong></bdi>
         </p>
       </li>
     </ol>`
  }]
};

suite('Bootstrap - empty cache', function() {

  suiteSetup(function() {
    // Make sure that the cache is empty.
    localStorage.removeItem('firstChunk');
  });

  suite('No cache', function() {
    setup(function(done) {
      applyCache('firstChunk').then(done);
    });

    test('Cache should not be active', function() {
      assert.isFalse(Cache.active);
    });

    test('No contact should be cached', function() {
      assert.isNull(Cache.contacts);
      assert.equal(Cache.length, 0);
    });

    test('No header should be cached', function() {
      assert.deepEqual(Cache.headers, {});
    });
  });
});

suite('Bootstrap - Valid cache, one contact', function() {
  var fakeContainer;

  suiteSetup(function() {
    localStorage.setItem('firstChunk',
                         JSON.stringify(VALID_CACHE_ONE_CONTACT));
    fakeContainer = document.createElement('div');
    fakeContainer.id = 'groups-list';
    document.body.appendChild(fakeContainer);
  });

  suiteTeardown(function() {
    Cache.cleanup();
    localStorage.removeItem('firstChunk');
    document.body.removeChild(fakeContainer);
  });

  suite('Cache with one contact', function() {
    setup(function(done) {
      applyCache('firstChunk').then(done);
    });

    test('Cache should be active', function() {
      assert.isTrue(Cache.active);
    });

    test('Contacts should be cached', function() {
      assert.isDefined(Cache.contacts);
      assert.equal(Cache.length, 1);
      assert.isTrue(Cache.hasContact(DUMMY_CONTACT_UUID));
    });

    test('Header "D" should be cached for contact "Dummy"', function() {
      assert.isDefined(Cache.headers.D);
    });

    test('Cache content should not be kept in memory', function() {
      assert.isNull(Cache._rawContent);
    });

    test('Getting the contact should remove it from memory', function() {
      assert.equal(Cache.length, 1);
      Cache.getContact(DUMMY_CONTACT_UUID);
      assert.equal(Cache.length, 0);
      assert.isUndefined(Cache.getContact(DUMMY_CONTACT_UUID));
    });

    test('Cache content should be applied to the DOM', function() {
      var contactSection = fakeContainer.querySelector('.section-group-D');
      assert.isDefined(contactSection);
    });

    test('Evicting cache should remove cache from disk and memory',
         function() {
      assert.isDefined(localStorage.getItem('firstChunk'));
      Cache.oneviction = () => {
        assert.isNull(localStorage.getItem('firstChunk'));
        assert.isNull(Cache.contacts);
        assert.deepEqual(Cache.headers, {});
      };
      Cache.evict();
    });
  });
});

suite('Bootstrap - Valid cache, multiple contacts', function() {
  var fakeContainer;

  suiteSetup(function() {
    localStorage.setItem('firstChunk',
                         JSON.stringify(VALID_CACHE_MULTIPLE_CONTACTS));
    fakeContainer = document.createElement('div');
    fakeContainer.id = 'groups-list';
    document.body.appendChild(fakeContainer);
  });

  suiteTeardown(function() {
    Cache.cleanup();
    localStorage.removeItem('firstChunk');
    document.body.removeChild(fakeContainer);
  });

  suite('Cache with multiple contacts', function() {
    setup(function(done) {
      applyCache('firstChunk').then(done);
    });

    test('Cache should be active', function() {
      assert.isTrue(Cache.active);
    });

    test('Contacts should be cached', function() {
      assert.isDefined(Cache.contacts);
      assert.equal(Cache.length, 3);
      assert.isTrue(Cache.hasContact(DUMMY_CONTACT_UUID));
      assert.isTrue(Cache.hasContact(ANOTHER_DUMMY_CONTACT_UUID));
      assert.isTrue(Cache.hasContact(YET_ANOTHER_DUMMY_CONTACT_UUID));
    });

    test('Header "D" should be cached for contact "Dummy"', function() {
      assert.isDefined(Cache.headers.D);
      assert.isDefined(Cache.headers.A);
      assert.isDefined(Cache.headers.Y);
    });

    test('Cache content should not be kept in memory', function() {
      assert.isNull(Cache._rawContent);
    });

    test('Getting the contact should remove it from memory', function() {
      assert.equal(Cache.length, 3);
      Cache.getContact(DUMMY_CONTACT_UUID);
      assert.equal(Cache.length, 2);
      Cache.getContact(ANOTHER_DUMMY_CONTACT_UUID);
      assert.equal(Cache.length, 1);
      Cache.getContact(YET_ANOTHER_DUMMY_CONTACT_UUID);
      assert.equal(Cache.length, 0);
      assert.isUndefined(Cache.getContact(DUMMY_CONTACT_UUID));
      assert.isUndefined(Cache.getContact(ANOTHER_DUMMY_CONTACT_UUID));
      assert.isUndefined(Cache.getContact(YET_ANOTHER_DUMMY_CONTACT_UUID));
    });

    test('Cache content should be applied to the DOM', function() {
      var contactDSection = fakeContainer.querySelector('.section-group-D');
      var contactASection = fakeContainer.querySelector('.section-group-A');
      var contactYSection = fakeContainer.querySelector('.section-group-Y');
      assert.isDefined(contactDSection);
      assert.isDefined(contactASection);
      assert.isDefined(contactYSection);
    });

    test('Evicting cache should remove cache from disk and memory',
         function() {
      assert.isDefined(localStorage.getItem('firstChunk'));
      Cache.oneviction = () => {
        assert.isNull(localStorage.getItem('firstChunk'));
        assert.isNull(Cache.contacts);
        assert.deepEqual(Cache.headers, {});
      };
      Cache.evict();
    });
  });
});
