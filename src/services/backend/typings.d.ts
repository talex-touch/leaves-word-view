declare namespace API {
  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseEnglishDictionaryVO_ = {
    code?: number;
    data?: EnglishDictionaryVO;
    message?: string;
  };

  type BaseResponseEnglishWordChangeLogVO_ = {
    code?: number;
    data?: EnglishWordChangeLogVO;
    message?: string;
  };

  type BaseResponseEnglishWordVO_ = {
    code?: number;
    data?: EnglishWordVO;
    message?: string;
  };

  type BaseResponseInt_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponseLoginUserVO_ = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponsePageEnglishDictionary_ = {
    code?: number;
    data?: PageEnglishDictionary_;
    message?: string;
  };

  type BaseResponsePageEnglishDictionaryVO_ = {
    code?: number;
    data?: PageEnglishDictionaryVO_;
    message?: string;
  };

  type BaseResponsePageEnglishWord_ = {
    code?: number;
    data?: PageEnglishWord_;
    message?: string;
  };

  type BaseResponsePageEnglishWordChangeLog_ = {
    code?: number;
    data?: PageEnglishWordChangeLog_;
    message?: string;
  };

  type BaseResponsePageEnglishWordChangeLogVO_ = {
    code?: number;
    data?: PageEnglishWordChangeLogVO_;
    message?: string;
  };

  type BaseResponsePageEnglishWordVO_ = {
    code?: number;
    data?: PageEnglishWordVO_;
    message?: string;
  };

  type BaseResponsePagePost_ = {
    code?: number;
    data?: PagePost_;
    message?: string;
  };

  type BaseResponsePagePostVO_ = {
    code?: number;
    data?: PagePostVO_;
    message?: string;
  };

  type BaseResponsePageUser_ = {
    code?: number;
    data?: PageUser_;
    message?: string;
  };

  type BaseResponsePageUserVO_ = {
    code?: number;
    data?: PageUserVO_;
    message?: string;
  };

  type BaseResponsePostVO_ = {
    code?: number;
    data?: PostVO;
    message?: string;
  };

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseUser_ = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserVO_ = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type checkUsingGETParams = {
    /** echostr */
    echostr?: string;
    /** nonce */
    nonce?: string;
    /** signature */
    signature?: string;
    /** timestamp */
    timestamp?: string;
  };

  type DeleteRequest = {
    id?: number;
  };

  type EnglishDictionary = {
    author?: string;
    create_time?: string;
    description?: string;
    id?: number;
    image_url?: string;
    is_delete?: number;
    isbn?: string;
    name?: string;
    publication_date?: string;
    publisher?: string;
    update_time?: string;
  };

  type EnglishDictionaryAddRequest = {
    author?: string;
    description?: string;
    image_url?: string;
    isbn?: string;
    name?: string;
    publication_date?: string;
    publisher?: string;
  };

  type EnglishDictionaryQueryRequest = {
    author?: string;
    content?: string;
    current?: number;
    description?: string;
    id?: number;
    image_url?: string;
    isbn?: string;
    name?: string;
    notId?: number;
    pageSize?: number;
    publication_date?: string;
    publisher?: string;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    tags?: string[];
    title?: string;
    userId?: number;
  };

  type EnglishDictionaryUpdateRequest = {
    author?: string;
    content?: string;
    description?: string;
    id?: number;
    image_url?: string;
    isbn?: string;
    name?: string;
    publication_date?: string;
    publisher?: string;
    title?: string;
  };

  type EnglishDictionaryVO = {
    content?: string;
    createTime?: string;
    id?: number;
    tagList?: string[];
    title?: string;
    updateTime?: string;
    user?: UserVO;
    userId?: number;
  };

  type EnglishWord = {
    create_time?: string;
    id?: number;
    info?: string;
    is_delete?: number;
    update_time?: string;
    word_head?: string;
  };

  type EnglishWordAddRequest = {
    content?: string;
    tags?: string[];
    title?: string;
  };

  type EnglishWordChangeLog = {
    change_time?: string;
    changed_by?: number;
    english_word_id?: number;
    field_name?: string;
    id?: number;
    new_value?: string;
    old_value?: string;
  };

  type EnglishWordChangeLogQueryRequest = {
    content?: string;
    current?: number;
    id?: number;
    notId?: number;
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    tags?: string[];
    title?: string;
    userId?: number;
  };

  type EnglishWordChangeLogVO = {
    content?: string;
    createTime?: string;
    id?: number;
    tagList?: string[];
    title?: string;
    updateTime?: string;
    user?: UserVO;
    userId?: number;
  };

  type EnglishWordEditRequest = {
    content?: string;
    id?: number;
    tags?: string[];
    title?: string;
  };

  type EnglishWordQueryRequest = {
    content?: string;
    current?: number;
    id?: number;
    notId?: number;
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    tags?: string[];
    title?: string;
    userId?: number;
  };

  type EnglishWordUpdateRequest = {
    content?: string;
    id?: number;
    tags?: string[];
    title?: string;
  };

  type EnglishWordVO = {
    content?: string;
    createTime?: string;
    id?: number;
    tagList?: string[];
    title?: string;
    updateTime?: string;
    user?: UserVO;
    userId?: number;
  };

  type getEnglishDictionaryVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getEnglishWordChangeLogVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getEnglishWordVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getPostVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type LoginUserVO = {
    createTime?: string;
    id?: number;
    updateTime?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageEnglishDictionary_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: EnglishDictionary[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageEnglishDictionaryVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: EnglishDictionaryVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageEnglishWord_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: EnglishWord[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageEnglishWordChangeLog_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: EnglishWordChangeLog[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageEnglishWordChangeLogVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: EnglishWordChangeLogVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageEnglishWordVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: EnglishWordVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PagePost_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Post[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PagePostVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: PostVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUser_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: User[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type Post = {
    content?: string;
    createTime?: string;
    favourNum?: number;
    id?: number;
    isDelete?: number;
    tags?: string;
    thumbNum?: number;
    title?: string;
    updateTime?: string;
    userId?: number;
  };

  type PostAddRequest = {
    content?: string;
    tags?: string[];
    title?: string;
  };

  type PostEditRequest = {
    content?: string;
    id?: number;
    tags?: string[];
    title?: string;
  };

  type PostFavourAddRequest = {
    postId?: number;
  };

  type PostFavourQueryRequest = {
    current?: number;
    pageSize?: number;
    postQueryRequest?: PostQueryRequest;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type PostQueryRequest = {
    content?: string;
    current?: number;
    favourUserId?: number;
    id?: number;
    notId?: number;
    orTags?: string[];
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    tags?: string[];
    title?: string;
    userId?: number;
  };

  type PostThumbAddRequest = {
    postId?: number;
  };

  type PostUpdateRequest = {
    content?: string;
    id?: number;
    tags?: string[];
    title?: string;
  };

  type PostVO = {
    content?: string;
    createTime?: string;
    favourNum?: number;
    hasFavour?: boolean;
    hasThumb?: boolean;
    id?: number;
    tagList?: string[];
    thumbNum?: number;
    title?: string;
    updateTime?: string;
    user?: UserVO;
    userId?: number;
  };

  type uploadFileUsingPOSTParams = {
    biz?: string;
  };

  type User = {
    createTime?: string;
    id?: number;
    isDelete?: number;
    mpOpenId?: string;
    unionId?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserAddRequest = {
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type userLoginByWxOpenUsingGETParams = {
    /** code */
    code: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserQueryRequest = {
    current?: number;
    id?: number;
    mpOpenId?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    unionId?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    userAccount?: string;
    userPassword?: string;
  };

  type UserUpdateMyRequest = {
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
  };

  type UserUpdateRequest = {
    id?: number;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserVO = {
    createTime?: string;
    id?: number;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };
}
