export declare global {
  interface DefaultResponse {
    msg: string;
    success?: boolean;
  }

  interface AuthState {
    isLoggedIn: boolean;
  }

  interface User {
    email?: string;
    isVerified?: boolean;
    role?: string;
    isEmailVerified?: boolean;
    firstTime?: boolean;
    _id?: string;
  }

  interface EndorseTypeResponse {
    _id?: string;
    user?: ProfileResponse | null;
    message?: string;
    endorseTo?: string;
  }

  interface UserRes {
    count: number;
    profile: ProfileResponse;
    endorsements: EndorseTypeResponse[];
  }

  interface ProfileResponse {
    _id: string;
    user: string;
    name: string;
    username?: string;
    avatar: string;
    title?: string;
    bio?: string;
    skills: string[];
    availableFor: string[];
    category?: string[];
    location?: {
      country: string;
      city: string;
    };
    publicId?: string;
    endorsements: EndorseTypeResponse[];
    likes: string[];
    email: string;
    isVerified: boolean;
    role: string;
    firstTime: boolean;
    savedBy: string[];
    count: number;
    folowId: {
      _id?: string;
      followers?: string[];
      following?: string[];
    };
    isFollowing?: boolean;
    isProfileSaved?: boolean;
  }

  interface UpdateUserProps {
    name?: string;
    avatar?: string;
    username?: string;
    bio?: string;
    title?: string;
    skills?: string[];
    availableFor?: string[];
    category?: string[];
    location?: {
      country: string;
      city: string;
    };
  }
  interface WorkExperienceType {
    companyName: string;
    position: string;
    description: string;
    from: string;
    to: string;
    current: boolean;
    location: string;
    _id?: string;
    user?: string;
  }
  interface EducationType {
    _id?: string;
    user?: string;
    schoolName: string;
    degree: string;
    fieldOfStudy: string;
    from: string;
    to: string;
    current: boolean;
  }

  interface SocialsType {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    behance?: string;
    dribble?: string;
    website?: string;
    youtube?: string;
    github?: string;
    medium?: string;
    fueler?: string;
  }

  interface SocialsResponse extends SocialsType {
    _id: string;
    user: string;
    updatedAt: string;
    createdAt: string;
  }

  interface ActivityType {
    title: string;
    description: string;
    collaborators: ProfileResponse[];
    date: string;
    link: string;
  }

  interface ActivityItemResponse extends ActivityType {
    _id: string;
    createdAt: string;
    updatedAt: string;
    user: string;
  }

  interface EndorseType {
    _id?: string;
    user?: string;
    message: string;
    endorseTo: string;
  }

  interface MessageType {
    message: string;
    uid: string;
  }

  interface UserResponse {
    profile: ProfileResponse;
    education: (EducationType & { _id: string })[];
    experience: WorkExperienceType[];
    activities: ActivityItemResponse[];
    socials: SocialsResponse;
    followers?: {
      followers?: string[];
      following?: string[];
    };
  }

  interface MessageListResponse {
    _id: string;
    user1: string;
    user2: string;
    profile1: ProfileResponse;
    profile2: ProfileResponse;
    messageDataId: string;
    createdAt: number;
    updatedAt: number;
    readBy: string | null;
    sender: string | null;
    msgResp?: MessageResponse;
    isJobProposal: boolean;
  }

  interface MessageResponse {
    _id?: string;
    message: string;
    timestamp: number;
    sender: User | string;
  }

  interface CategoryProp {
    category?: string;
    page: number;
    city?: string;
    offering?: string;
  }

  interface ReplyProps {
    _id: string;
    user: ProfileResponse;
    msg: string;
    date: string;
    upvotes: string[];
    replyId?: string;
    replyingToUsername?: string;
    upvoteCount: number;
    isUpvoted?: boolean;
  }

  interface CommentResponse {
    _id: string;
    user: ProfileResponse;
    msg: string;
    date: string;
    upvotes: string[];
    firstTwoReplies: ReplyProps[];
    repliesCount: number;
    upvoteCount: number;
    isUpvoted?: boolean;
  }

  interface IdeaResponse {
    _id?: string;
    title: string;
    description: string;
    user: ProfileResponse;
    upvotes: string[];
    downvotes: string[];
    tags: string[];
    lookingFor: string[];
    url: string;
    createdAt: number;
    updatedAt: number;
    imgUrl: string[];
    commentsCount: number;
    upvoteCount: number;
    isUpvoted?: boolean;
    isFollowing?: boolean;
  }

  interface IdeaProps {
    description: string;
    tags: string[];
    imageToPost?: string[];
  }

  interface ApplicationProps {
    _id?: string;
    appliedBy?: ProfileResponse | string;
    proposal?: string;
    status?: string;
    appliedOn?: string;
  }
  interface OpportunityProps {
    _id?: string;
    user?: ProfileResponse;
    title: string;
    description: string;
    skills: string[];
    salaryRange: string;
    company?: {
      name: string;
      logo: string;
      _id: string;
    };
    jobType: string;
    interval: string;
    duration?: string;
    createdAt?: string;
    workLocation?: "remote" | "office" | "hybrid";
    recieveApplicationsVia?: "piqr" | "website";
    externalLink?: string;
    applicantsCount?: number;
    companyId?: string;
    experience?: string;
    accessIds?: string[];
  }

  interface INotificationResponse {
    _id?: string;
    sender: ProfileResponse[];
    receiver: string;
    content: string;
    type: string;
    read?: boolean;
    link?: string;
    createdAt?: string;
    updatedAt?: string;
    isNew?: boolean;
    postId?: string;
    replyId?: string;
    data?: string;
    senderCount?: number;
    isFollowing?: boolean;
  }

  interface ICommentState {
    id: string;
    shouldVisible: boolean;
    isReply: boolean;
    replyingTo?: {
      username: string;
      name: string;
    };
  }

  interface CompanyParams {
    name: string;
    website: string;
    logo: string;
    oneLiner: string;
    description: string;
    location: string;
    founded?: string;
    industry: string;
    companySize: string;
    admins?: string[];
    createdBy?: string;
  }
}
