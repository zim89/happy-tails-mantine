import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'

import Notify from "./";
import { TestWrapper } from '../TestWrapper';

const renderTree = (visible: boolean) => {
    return (
        <TestWrapper>
            <Notify kind='success' onClose={() => { }} text="TEST TEXT" visible={visible} />
        </TestWrapper>
    )
}

test("Notify is hidden", () => {
    render(
        renderTree(false)
    );

    const notifyText = screen.queryByText("TEST TEXT");
    expect(notifyText).not.toBeInTheDocument();
})

test("Notify is visible", () => {
    render(
        renderTree(true)
    )

    const notifyText = screen.queryByText("TEST TEXT");
    expect(notifyText).toBeVisible();
})