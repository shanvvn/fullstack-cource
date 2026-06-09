import { Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import theme from '../theme';

const styles = StyleSheet.create({
  tabText: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    paddingHorizontal: 10,
  },
});

const AppBarTab = ({ title, to }) => {
  return (
    <Link to={to} component={Pressable}>
      <Text style={styles.tabText}>{title}</Text>
    </Link>
  );
};

export default AppBarTab;
