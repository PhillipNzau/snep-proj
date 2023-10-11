import React, { useState, useEffect } from 'react';

interface CharityFormProps {
  onsubmit: (formData: CharityFormData) => void;

}

interface CharityFormData {
  firstName: string;
  lastName: string;
  email: string;
  charityName: string;
  charityDescription: string;
  charityAmountGoal: number;
  charityImage: File | null;
}

const
