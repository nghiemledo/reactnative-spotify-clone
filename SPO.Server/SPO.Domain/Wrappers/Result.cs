﻿namespace SPO.Domain.Wrappers
{
    public class Result : IResult
    {
        public Result()
        {
        }

        public List<string> Messages { get; set; } = new List<string>();

        public bool Status { get; set; }

        public static IResult Fail()
        {
            return new Result { Status = false };
        }

        public static IResult Fail(string message)
        {
            return new Result { Status = false, Messages = new List<string> { message } };
        }

        public static IResult Fail(List<string> messages)
        {
            return new Result { Status = false, Messages = messages };
        }

        public static Task<IResult> FailAsync()
        {
            return Task.FromResult(Fail());
        }

        public static Task<IResult> FailAsync(string message)
        {
            return Task.FromResult(Fail(message));
        }

        public static Task<IResult> FailAsync(List<string> messages)
        {
            return Task.FromResult(Fail(messages));
        }

        public static IResult Success()
        {
            return new Result { Status = true };
        }

        public static IResult Success(string message)
        {
            return new Result { Status = true, Messages = new List<string> { message } };
        }

        public static Task<IResult> SuccessAsync()
        {
            return Task.FromResult(Success());
        }

        public static Task<IResult> SuccessAsync(string message)
        {
            return Task.FromResult(Success(message));
        }
    }
}