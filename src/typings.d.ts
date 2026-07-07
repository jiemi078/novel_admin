declare namespace API {
  type CurrentUser = {
    id?: number;
    name?: string;
    nickname?: string;
    avatar?: string;
    email?: string;
    phone?: string;
    access?: string;
    roles?: string[];
    permissions?: string[];
  };

  type ApiResponse<T = unknown> = {
    code?: number;
    msg?: string;
    data?: T;
  };
}

interface Window {
  config?: {
    api_url?: string;
  };
}
