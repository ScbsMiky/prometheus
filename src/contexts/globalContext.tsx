export const apiDomain = "http://192.168.1.2:1010";

type RequestOptions = {
  url: string;
  
  type?: "json" | "text";
  method?: "GET" | "POST";

  body?: { [key: string]: any };
  params?: { [key: string]: any };
  headers?: { [key: string]: any };
};

export async function request(props: RequestOptions) {
  const options: { [key: string]: any } = { };
  
  options.headers = { ...(props.headers || { }) };

  options.method = props.method || "GET";

  if(props.body) {
    options.method = "post";
    options.body = JSON.stringify(props.body);
    options.headers["Content-Type"] = "application/json";
  };

  props.url = `${props.url}${props.params ? `?${Object.keys(props.params).map((key) => `${key}=${(props.params || {})[key]}`)}` : ""}`;

  return fetch(props.url, options)
    .then((response) => response[(props.type || "json")]( ));
};
