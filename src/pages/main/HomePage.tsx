import React from 'react';
// import MD components & components
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// import i18next
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) => createStyles({
    main: {
        height: 'calc(100vh - 50px)',
        width: '100%',
        userSelect: 'none',
        display: 'flex',
    },
    text: {
        margin: 'auto',
        color: '#c2c2c2',
        fontSize: 50,
        letterSpacing: '16px',
        textAlign: 'center',
    }
}));

export const HomePage: React.FC = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    return (
        <div className={classes.main}>
            <div className={classes.text}>
                {t("home.welcome")}
            </div>
        </div>
    )
}
