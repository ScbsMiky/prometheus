export type ISection = {
  title: string;
  icon: JSX.Element[ ] | JSX.Element;
};

export type IBasebox = {
  header: {
    title: string;
    icon?: JSX.Element[ ] | JSX.Element;
  };

  left: ISection[ ];
  right: ISection[ ];

  onClick?( ): void;
};