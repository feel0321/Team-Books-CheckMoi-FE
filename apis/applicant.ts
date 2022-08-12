import { apiClient } from "./api";
import { END_POINT } from ".";
import { ResponseApplicantMemberType } from "../types/applicantType";

interface getApplicantsProps {
  studyId: string;
  token: string;
}

interface putApplicantProps {
  studyId: string;
  memberId: string;
  token: string;
  status: string;
}

export const getApplicantMembers = async ({
  studyId,
  token,
}: getApplicantsProps) => {
  const data = await apiClient.get<
    ResponseApplicantMemberType,
    ResponseApplicantMemberType
  >(`${END_POINT.applicants}/${studyId}/members`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.members;
};

export const putApplicantAcceptOrDeny = async ({
  studyId,
  memberId,
  token,
  status,
}: putApplicantProps) => {
  const data = await apiClient.put(
    `${END_POINT.applicants}/${studyId}/members/${memberId}`,
    { status },
    {
      headers: {
        Authorization: `bearer ${token}`,
      },
    }
  );
  return data;
};
