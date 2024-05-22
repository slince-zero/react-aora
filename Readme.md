#### 可以看到，一些文件夹和文件的命名，其实是符合 `Next.js` 的命名规范的，主要是因为 `Expo` 和 `Next.js` 的集成：

- 原因：`Expo` 提供了与 Next.js 的集成解决方案，可以在同一个项目中使用 `React Native` 和 `Next.js`。

- 示例：通过 `Expo` for Web，可以使用 `React Native` 编写代码，同时在 Web 上运行，这时候 `Next.js` 的文件命名规范就显得很自然。

- 好处：这种集成方式允许开发者使用相同的代码库，同时为移动端和 Web 端提供支持。



#### Tabs.Screen 和 Stack.Screen 的区别

**导航类型**:

Tabs.Screen 用于底部标签导航，适用于需要在屏幕之间快速切换的情况。
Stack.Screen 用于栈式导航，适用于需要在屏幕之间进行推入和弹出（前进和后退）操作的情况。

**导航结构**:

Tabs.Screen 放在 Tab.Navigator 内部。
Stack.Screen 放在 Stack.Navigator 内部。

**界面展示**:

Tabs.Screen 会在底部显示一个标签栏，每个标签对应一个屏幕。
Stack.Screen 通常会包含一个标题栏和返回按钮，用于导航回到前一个屏幕。

**示例用法对比**:

```jsx
// Tabs.Screen 示例
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

<Tab.Navigator>
  <Tab.Screen name="Home" component={HomeScreen} />
  <Tab.Screen name="Settings" component={SettingsScreen} />
</Tab.Navigator>
```

```jsx
// Stack.Screen 示例
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

<Stack.Navigator>
  <Stack.Screen name="Home" component={HomeScreen} />
  <Stack.Screen name="Details" component={DetailsScreen} />
</Stack.Navigator>
```

不过有一个细节，就是`Tab.Navigator`和`Stack.Navigator`，本来不这样写是会出问题的，但是`expo-router`封装了导航逻辑，使得<Stack> 和 <Tabs> 组件可以直接使用
