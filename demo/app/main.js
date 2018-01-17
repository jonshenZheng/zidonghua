/* 
* @Author: RainCloud
* @Date:   2018-01-17 11:37:09
* @Last Modified by:   RainCloud
* @Last Modified time: 2018-01-17 15:45:34
*/
import '../app/css/test.css';
import _ from 'lodash';
function component () {
  var element = document.createElement('div');

  /* 需要引入 lodash，下一行才能正常工作 */
  element.innerHTML = _.join(['Hello','webpack'], ' ');

  element.style.display = 'flex';

  return element;
}

document.body.appendChild(component());