import * as React from 'react'
import { Dropdown, Avatar, Menu } from 'antd'

interface IAccountMenuProps {
  avatarUrl: string
}

class AccountMenu extends React.PureComponent<IAccountMenuProps> {
  render() {
    return (
      <Dropdown
        placement="bottomCenter"
        overlay={
          <Menu>
            <Menu.Item key="logout">
              <a onClick={() => alert('logout')}>Log Out</a>
            </Menu.Item>
          </Menu>
        }
        trigger={['click']}
      >
        <Avatar style={{ cursor: 'pointer' }} src={this.props.avatarUrl} />
      </Dropdown>
    )
  }
}

export default AccountMenu
