/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';
import '@testing-library/jest-dom';
import HorseForm from '../forms/HorseForm';

describe('Tests to check horse creation and use', () => {
  test('Verify, that empty data can\'t be submitted', () => {
    render(<HorseForm />);

    expect(screen.getByText('Submit horse')).toBeDisabled();
  });

  test('Verify, that when data is inputted, it can be submitted', () => {
    render(<HorseForm />);
    const horseName = screen.getByPlaceholderText('Name');
    userEvent.type(horseName, 'Tagore');
    userEvent.type(screen.getByPlaceholderText('Color'), 'black');
    expect(screen.getByText('Submit horse')).toBeEnabled();
  });

  test('Verify, that correct data gets passed, when submitted', () => {
    render(<HorseForm />);
    userEvent.type(screen.getByLabelText('Enter horse name'), 'Tagore');
    userEvent.type(screen.getByLabelText('Enter color'), 'black');
  });
});
