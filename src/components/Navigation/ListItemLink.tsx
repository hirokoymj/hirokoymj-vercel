import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import Divider from '@mui/material/Divider';
import { Link, useLocation } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles()((theme: Theme) => ({
  icon: {
    color: 'rgba(0, 0, 0, 0.8)',
    minWidth: '40px',
  },
  selectedItem: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  unSelectedItem: {
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
}));

interface ListItemLinkProps {
  icon?: React.ReactElement<unknown>;
  text: string;
  to: string;
  isActive?: boolean;
}

const ListItemLink = ({ icon, text, to, isActive }: ListItemLinkProps) => {
  const { classes } = useStyles();

  return (
    <ListItemButton component={Link} to={to} className={isActive ? classes.selectedItem : classes.unSelectedItem}>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={text} />
    </ListItemButton>
  );
};

export const LeftNaviagtion = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <List>
        <ListItemLink
          to="/weather/dallas"
          text="Weather"
          icon={<CloudOutlinedIcon />}
          isActive={currentPath.includes('/weather')}
        />
      </List>
      <Divider />
      <List>
        <ListItemLink
          to="/ai-weather"
          text="AI - Weather Chat"
          icon={<AutoAwesomeOutlinedIcon />}
          isActive={currentPath.includes('/ai-weather')}
        />
        <ListItemLink
          to="/ai-recipe"
          text="AI - Recipe"
          icon={<AutoAwesomeOutlinedIcon />}
          isActive={currentPath.includes('/ai-recipe')}
        />{' '}
        <ListItemLink
          to="/ai-chat"
          text="AI - Chat with Image"
          icon={<AutoAwesomeOutlinedIcon />}
          isActive={currentPath.includes('/ai-chat')}
        />
        <ListItemLink
          to="/ai-image-edit"
          text="AI - Image edit"
          icon={<AutoAwesomeOutlinedIcon />}
          isActive={currentPath.includes('/ai-image-edit')}
        />
        <ListItemLink
          to="/ai-image-generator"
          text="AI - image generator"
          icon={<AutoAwesomeOutlinedIcon />}
          isActive={currentPath.includes('/ai-image-generator')}
        />
        <ListItemLink
          to="/ai-text-generator"
          text="AI - text generator"
          icon={<AutoAwesomeOutlinedIcon />}
          isActive={currentPath.includes('/ai-text-generator')}
        />
        <ListItemLink
          to="/ai-summary"
          text="AI - text summarizer"
          icon={<AutoAwesomeOutlinedIcon />}
          isActive={currentPath.includes('/ai-summary')}
        />
      </List>
      <Divider />
      <List>
        <ListItemLink
          to="/tech/react"
          text="Tech Topics"
          icon={<ArticleOutlinedIcon />}
          isActive={currentPath.includes('/tech')}
        />
      </List>
      <Divider />
      <List>
        <ListItemLink
          to="/category"
          text="Create Category"
          icon={<ArticleOutlinedIcon />}
          isActive={currentPath.includes('/category')}
        />
        <ListItemLink
          to="/subCategory"
          text="Create Subcategory"
          icon={<ArticleOutlinedIcon />}
          isActive={currentPath.includes('/subCategory')}
        />
        <ListItemLink
          to="/topic"
          text="Create Link"
          icon={<ArticleOutlinedIcon />}
          isActive={currentPath.includes('/topic')}
        />
      </List>
      <Divider />
    </>
  );
};
