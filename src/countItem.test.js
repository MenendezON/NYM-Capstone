/**
 * @jest-environment jsdom
 */

import countItems from './module/countItem.js';

describe('counters', () => {
  it('should add two events to the DOM', () => {
    document.body.innerHTML = `
     <div id="events"></div>
   `;
    const events = document.querySelector('#events');
    const event = document.createElement('div');
    const event2 = document.createElement('div');
    event.id = 'event';
    event2.id = 'event';
    events.appendChild(event);
    events.appendChild(event2);
    expect(events.children.length).toBe(2);
  });

  it('should return 2', () => {
    const events = document.querySelector('#events');
    events.innerHTML = '';
    const event = document.createElement('div');
    const event2 = document.createElement('div');
    event.id = 'event';
    event2.id = 'event';
    events.appendChild(event);
    events.appendChild(event2);
    expect(countItems()).toBe(2);
  });

  it('should return 2', () => {
    document.body.innerHTML = `
     <div id="events">
       <div id="event">
         <div class="comments">
           <div class="comment"></div>
           <div class="comment"></div>
         </div>
       </div>
     </div>
   `;
    const comments = document.querySelectorAll('.comment');
    expect(comments.length).toBe(2);
  });
});