import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Toolbar, Typography, MenuItem, Button, ClickAwayListener, Grow, MenuList, Paper, Popper } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    homeLink: {
        textDecoration: 'none',
        color: 'white'
    },
    accordionLink: {
        textDecoration: 'none',
        color: 'black'
    }
}));

const TopBar: React.FC = () => {
    const classes = styles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);
    const prevOpen = React.useRef(open);

    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const handleToggle = (): void => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: React.MouseEvent<EventTarget>): void => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent): void {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Button
                    color="inherit"
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <MenuIcon />
                </Button>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }): React.ReactNode => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                        <MenuItem onClick={handleClose}>
                                            <Link className={classes.accordionLink} to="/tutorial">Tutorial</Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <Link className={classes.accordionLink} to="/contact">Contact</Link>
                                        </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
                <Typography variant="h6" className={classes.title}>
                    <Link className={classes.homeLink} to="/">Home</Link>
                </Typography>
            </Toolbar>
        </AppBar>
    )
};

export default TopBar;
