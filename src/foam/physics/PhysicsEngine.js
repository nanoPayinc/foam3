/**
 * @license
 * Copyright 2015 Google Inc. All Rights Reserved.
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

foam.CLASS({
  package: 'foam.physics',
  name: 'PhysicsEngine',
  extends: 'foam.physics.Collider',

  documentation: 'PhysicsEngine is a sub-type of Collider which adds support for friction and gravity.',

  properties: [
    {
      class: 'Boolean',
      name: 'gravity'
    },
    {
      class: 'Float',
      name: 'gravityStrength',
      value: 1
    }
  ],

  methods: [
    function updateChild(c) {
      this.SUPER(c);

      var gravity = c.gravity, friction = c.friction;

      // Gravity
      if ( gravity && this.gravity ) {
        var d = this.bounds.height - c.bottom_;
        // Have vy decay to zero
        if ( d > 10 ) {
          c.vy += gravity * this.gravityStrength;
        } else if ( d > 1 ) {
          c.vy += gravity * this.gravityStrength * (d/10)*(d/10);
        }
      }

      // Friction
      if ( friction ) {
        c.vx = Math.abs(c.vx) < 0.001 ? 0 : c.vx * friction;
        c.vy = Math.abs(c.vy) < 0.001 ? 0 : c.vy * friction;
      }

      // Inertia
      if ( Math.abs(c.vx) > 0.001 ) c.x += c.vx;
      if ( Math.abs(c.vy) > 0.001 ) c.y += c.vy;
    }
  ]
});
