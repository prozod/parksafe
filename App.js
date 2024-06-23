import { StatusBar } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./views/Home";
import About from "./views/About";
import Contact from "./views/Contact";
import Logo from "./assets/psafe.svg";
import React, { useState } from "react";
import { AppContext } from "./AppCtx";
const Drawer = createDrawerNavigator();
// export const AppContext = React.createContext(null);

export default function App() {
  const [reservedSpots, setReservedSpots] = useState([
    { id: 1, reserved: false },
    { id: 2, reserved: false },
    { id: 3, reserved: false },
  ]);
  const [currentDevice, setCurrentDevice] = useState("");

  console.disableYellowBox = true;
  return (
    <>
      <AppContext.Provider
        value={{
          reservedSpots: reservedSpots,
          setReservedSpots: setReservedSpots,
          currentDevice: currentDevice,
          setCurrentDevice: setCurrentDevice,
        }}
      >
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
      </AppContext.Provider>
    </>
  );
}
