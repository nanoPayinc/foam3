/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

foam.ENUM({
  package: 'foam.demos.olympics',
  name: 'MedalColor',

  values: [
    {
      name: 'GOLD',
      label: 'Gold'
    },
    {
      name: 'SILVER',
      label: 'Silver'
    },
    {
      name: 'BRONZE',
      label: 'Bronze'
    }
  ]
});


foam.CLASS({
  package: 'foam.demos.olympics',
  name: 'Medal',

  tableColumns: [ 'year', 'color', 'city', 'country', 'discipline', 'sport', 'event', 'gender', 'firstName', 'lastName' ],

  properties: [
    { class: 'Int', name: 'id' },
    { class: 'Int', name: 'year', shortName: 'y' },
    {
      class: 'Enum',
      of: 'foam.demos.olympics.MedalColor',
      name: 'color',
      shortName: 'c',
      aliases: [ 'colour', 'medal' ],
      colorMap: { GOLD: 'gold', SILVER: 'silver', BRONZE: 'brown' },
      tableCellView: function(medal, e) {
        return e.E('span').addClass(medal.color.label).add(medal.color.label);
      },
      searchView: {
        class: 'foam.u2.search.GroupBySearchView',
        viewSpec: {
          class: 'foam.u2.view.ChoiceView',
          selectSpec: {
            class: 'foam.u2.tag.Select',
            size: 4
          }
        }
      }
    },
    { class: 'String', name: 'city',        shortName: 'cy' },
    { class: 'String', name: 'country',     shortName: 'cn' },
    { class: 'String', name: 'discipline',  shortName: 'd' },
    { class: 'String', name: 'sport',       shortName: 's' },
    { class: 'String', name: 'event',       shortName: 'e' },
    { class: 'String', name: 'eventGender', shortName: 'eg', value: 'M', hidden: true },
    {
      class: 'String',
      name: 'gender',
      shortName: 'g',
      aliases: [ 'sex' ],
      value: 'Men',
      view: { class: 'foam.u2.view.ChoiceView', choices: [ 'Men', 'Women' ] },
      colorMap: { Men: 'lightskyblue', Women: 'pink' },
      searchView: {
        class: 'foam.u2.search.GroupBySearchView',
        viewSpec: {
          class: 'foam.u2.view.ChoiceView',
          selectSpec: {
            class: 'foam.u2.tag.Select',
            size: 3
          }
        }
      }
    },
    { class: 'String', name: 'firstName', shortName: 'f', aliases: [ 'fname', 'fn', 'first' ] },
    { class: 'String', name: 'lastName',  shortName: 'l', aliases: [ 'lname', 'ln', 'last' ] },
    { class: 'String', name: 'name',      shortName: 'n',
      transient: true,
      showInPropertyChoice: true,
      expression: function(firstName, lastName) { return firstName + ' ' + lastName; },
      javaGetter: 'return getFirstName() + " " + getLastName();'
    },
  ]
});
