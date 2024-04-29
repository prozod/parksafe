import { StatusBar } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./views/Home";
import About from "./views/About";
import Contact from "./views/Contact";
import Logo from "./assets/psafe.svg";
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Drawer.Navigator
        screenOptions={{
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#202020",
          },
          headerBackgroundContainerStyle: "#202020",
          drawerActiveTintColor: "#32CB82",
          drawerActiveBackgroundColor: "grey",
          drawerInactiveTintColor: "white",
          drawerInactiveBackgroundColor: "white",
          drawerLabelStyle: {
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 5,
          },
          drawerStyle: {
            backgroundColor: "#202020",
          },
          drawerItemStyle: {
            backgroundColor: "#202020",
            borderColor: "rgba(255, 255, 255, 0.1)",
            borderWidth: 1,
            borderStyle: "solid",
          },
          drawerType: "slide",
        }}
      >
        <Drawer.Screen
          name={"Home"}
          component={Home}
          options={{
            headerTitle: () => <Logo />,
            drawerLabel: "Dashboard",
            headerTitleAlign: "center",
          }}
        />
        <Drawer.Screen
          name="About"
          component={About}
          options={{ drawerLabel: "About" }}
        />
        <Drawer.Screen
          name="Contact"
          component={Contact}
          options={{ drawerLabel: "Contact" }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
