import * as React from 'react';
import {withStyles, Theme, StyleRulesCallback} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import withRoot from '../../../../withRoot';
// import {Route} from 'react-router-dom'

import {Identity} from '../../types/model/identity'

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
});


interface AgentListProps {
  classes: any,
  users: Array<Identity>
}

interface AgentListState {
  filterString: string,
  selectedAgents: Array<Identity>
}


const MakeAvatar = (props: {user: Identity}) => {
  const {user} = props
  if(user.avatar && user.avatar.length > 0) {
    return (<Avatar src={user.avatar}/>)
  } else {
    return (<Avatar>{user.handle[0]}</Avatar>)
  }
}

class AgentList extends React.Component<AgentListProps, AgentListState> {
  constructor(props: AgentListProps) {
    super(props)
    this.state = {
      filterString: '',
      selectedAgents: []
    }
  }

  onFilterStringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state, 
      filterString: e.target.value
    })
  }

  render() {
    const {classes, users} = this.props
    return (
      <div className={classes.root}>
        <Typography variant='display1'>
          Users
        </Typography>
        <Input
          id="filter-bar"
          placeholder="filter"
          value={this.state.filterString}
          onChange={this.onFilterStringChange}
        />
        <List id="users" component="nav">
          {
            users
            .filter((user) => {return user.handle.toLowerCase().search(this.state.filterString.toLowerCase()) !== -1})
            .map((user, i) => { return (
              <ListItem key={i} button={true} value={user.hash} className={classes.listItem}>
                <MakeAvatar user={user}/>
                <ListItemText primary={user.handle}/>
              </ListItem>
            )})
          }
        </List>
      </div>
    )
  }

}


export default withRoot(withStyles(styles)(AgentList));
