"use client";

import { ScoreDocument } from "@/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, toSnakeCase } from "@/lib/utils";
import { leaderboardsCaption } from "@/constants";

const HighscoresTable = ({ highScores }: { highScores: ScoreDocument[] }) => {
  return (
    <Table className="text-lg w-full">
      <TableCaption>{leaderboardsCaption}</TableCaption>
      <TableHeader>
        <TableRow>
          {Object.keys(highScores[0]).map((key) => (
            <TableHead key={key} className="border-r-2 border-theme-gray">
              {toSnakeCase(key)}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {highScores.map((score, index) => (
          <TableRow
            key={index}
            className="border-b-2 border-theme-gray *:border-r-2 *:border-theme-gray"
          >
            <TableCell>{toSnakeCase(score.name)}</TableCell>
            <TableCell>{score.score}</TableCell>
            <TableCell>{formatDate(score.timestamp)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default HighscoresTable;
