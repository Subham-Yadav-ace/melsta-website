"use client";

import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "bordered" | "elevated";
  padding?: "none" | "sm" | "md" | "lg";
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  variant = "default",
  padding = "md",
}) => {
  const baseStyles = "rounded-lg bg-white dark:bg-gray-900 transition-colors";

  const variants = {
    default: "border border-gray-200 dark:border-gray-800",
    bordered: "border-2 border-gray-200 dark:border-gray-700",
    elevated: "shadow-md hover:shadow-lg dark:shadow-gray-900/20",
  };

  const paddings = {
    none: "",
    sm: "p-3",
    md: "p-6",
    lg: "p-8",
  };

  const cardClass = `${baseStyles} ${variants[variant]} ${paddings[padding]} ${className}`;

  return <div className={cardClass}>{children}</div>;
};

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`flex flex-col space-y-1.5 pb-6 ${className}`}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className = "",
}) => {
  return <div className={`${className}`}>{children}</div>;
};

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`flex items-center pt-6 ${className}`}>{children}</div>
  );
};
