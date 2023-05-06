
import { Menu } from 'antd';
import {asyncRoutes} from '../../routes/index'
import {Link} from 'react-router-dom'
import useMenu from './useMenu'

function createItems(asyncRoutes){
  let arr = []
  asyncRoutes.forEach(items => {
    if(!items.hidden){
      if(!items.children){
        arr.push(getItem(items.label,items.key,items.icon,null,items.path))
      }else{
        arr.push(getItem(items.label,items.key,items.icon,createItems(items.children),items.path))
      }
    }
  });
  return arr
}

function getItem(label, key, icon, children, path) {
  return {
    key,
    icon,
    children,
    label:path ? <Link to = {path}>{label}</Link> :label,
    path,
  };
}
function Mysider(props){
  const [selectedKey, openKey] = useMenu()
  return (
    <div >
      <Menu
        defaultSelectedKeys={selectedKey}
        defaultOpenKeys={openKey}
        mode="inline"
        theme="dark"
        items={createItems(asyncRoutes)}
      />
    </div>
  );
};
export default Mysider;