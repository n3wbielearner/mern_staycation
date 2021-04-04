import React from "react";
import { render } from "@testing-library/react";
import Button from "./index";
import { BrowserRouter as Router } from "react-router-dom";

//test isDisabled
test("Should not allowed click button if isDisabled is present", () => {
  //calling Button component, not literal button
  //Here 'isDisabled' is put in tag <span>
  //(?) is 'isDisabled' really not efficient if put in tag <a> or <button> (?)
  const { container } = render(<Button isDisabled></Button>);

  expect(container.querySelector("span.disabled")).toBeInTheDocument();
});

//test isLoading
test("Should render loading/spinner", () => {
  const { container, getByText } = render(<Button isLoading></Button>);

  //check by using regexp and case insensitive, weather text 'loading' is in there
  expect(getByText(/loading/i)).toBeInTheDocument();

  //container should have span, and check if it is in the document
  expect(container.querySelector("span")).toBeInTheDocument();
});

//check link
test("Should render <a> tag", () => {
  //without isExternal then you will have an error:
  //'Invariant failed: You should not use <Link> outside a <Router>
  const { container, getByText } = render(
    <Button type="link" isExternal></Button>
  );

  //container should have <a> tag
  expect(container.querySelector("a")).toBeInTheDocument();
});

//check link
test("Should render <Link> tag", () => {
  //without <Router>..</Router> we will have:
  //'Invariant failed: You should not use <Link> outside a <Router>
  //
  //we also need to add href="" otherwise we will have:
  //Warning:Failed prop type: The prop 'to' is marked as required in 'Link', but its value is 'undefined'
  const { container, getByText } = render(
    <Router>
      <Button href="" type="link"></Button>
    </Router>
  );

  //container should have <a> tag
  expect(container.querySelector("a")).toBeInTheDocument();
});
