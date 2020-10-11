import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    overrides: {
      MuiCssBaseline: {
        '@global': {
          html: {
            height: '100%',
            width: '100%',
          },
          body: {
            height: '100%',
            width: '100%',
          }
        },
      },
    },
  });

  export default theme;
