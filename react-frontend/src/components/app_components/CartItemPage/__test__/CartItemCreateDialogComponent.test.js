import React from "react";
import { render, screen } from "@testing-library/react";

import CartItemCreateDialogComponent from "../CartItemCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders cartItem create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CartItemCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("cartItem-create-dialog-component")).toBeInTheDocument();
});
