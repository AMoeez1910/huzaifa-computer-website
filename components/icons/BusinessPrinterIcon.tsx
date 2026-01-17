interface BusinessPrinterIconProps {
  className?: string;
}

export function BusinessPrinterIcon({
  className = "w-16 h-16",
}: BusinessPrinterIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className={className}
      fill="currentColor"
    >
      <g>
        <path d="M61,15H21.4L60.27,7.44a.994.994,0,0,0,.79-1.17l-.57-2.95a.991.991,0,0,0-1.17-.79L13,11.54V10a1,1,0,0,0-1-1H5a3.009,3.009,0,0,0-3,3V61a1,1,0,0,0,1,1H61a1,1,0,0,0,1-1V16A1,1,0,0,0,61,15ZM13,13.57,58.72,4.68l.19.99L13,14.6ZM4,12a1,1,0,0,1,1-1h6V24H4ZM53,60H11V50H53Zm0-12H11V37H53Zm7,12H55V36a1,1,0,0,0-1-1H10a1,1,0,0,0-1,1V60H4V26H60Zm0-36H13V17H60Z" />
        <path d="M10,28H7a1,1,0,0,0-1,1v3a1,1,0,0,0,1,1h3a1,1,0,0,0,1-1V29A1,1,0,0,0,10,28ZM9,31H8V30H9Z" />
        <path d="M14,33h3a1,1,0,0,0,1-1V29a1,1,0,0,0-1-1H14a1,1,0,0,0-1,1v3A1,1,0,0,0,14,33Zm1-3h1v1H15Z" />
      </g>
    </svg>
  );
}
