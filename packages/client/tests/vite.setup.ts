import Enzyme, { mount, render, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import React from "react";

Enzyme.configure({ adapter: new Adapter() });

global.React = React;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.shallow = shallow;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.render = render;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.mount = mount;
